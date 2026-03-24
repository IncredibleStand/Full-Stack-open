const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Empty the database using the testing router
    await request.post('/api/testing/reset')

    // Create a fresh user for the backend
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword'
      }
    })

    // Navigate to the base URL before every single test
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeading = page.getByText('log in to application')
    await expect(loginHeading).toBeVisible()

    const usernameInput = page.getByRole('textbox', { name: 'Username' })
    const passwordInput = page.getByRole('textbox', { name: 'Password' })
    
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()

    const loginButton = page.getByRole('button', { name: 'login' })
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Type the credentials into the inputs
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('testpassword')
      
      // Click the login button
      await page.getByRole('button', { name: 'login' }).click()

      // Verify the UI updates to show the user is logged in
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Type the CORRECT username but WRONG password
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('wrongpassword')
      
      // Click the login button
      await page.getByRole('button', { name: 'login' }).click()

      // Verify the error notification appears
      await expect(page.getByText('wrong username or password')).toBeVisible()
      
      // Verify the user is NOT logged in
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('testpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByLabel('title').fill('Playwright is awesome')
      await page.getByLabel('author').fill('Test Author')
      await page.getByLabel('url').fill('http://playwright.dev')

      await page.getByRole('button', { name: 'create' }).click()

      const createdBlog = page.locator('.blog').filter({ hasText: 'Playwright is awesome' }).first()
      
      await expect(createdBlog).toBeVisible()

      await expect(page.locator('.blog').getByText('Playwright is awesome')).toBeVisible()
      await expect(page.locator('.blog').getByText('Test Author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('A blog to be liked')
      await page.getByLabel('author').fill('Like Tester')
      await page.getByLabel('url').fill('http://liketest.com')
      await page.getByRole('button', { name: 'create' }).click()

      // Isolate this specific blog using the filter approach
      const blogElement = page.locator('.blog').filter({ hasText: 'A blog to be liked' }).first()
      await expect(blogElement).toBeVisible()

      await blogElement.getByRole('button', { name: 'view' }).click()

      // Verify the initial state is 0 likes
      await expect(blogElement.getByText('likes 0')).toBeVisible()

      await blogElement.getByRole('button', { name: 'like' }).click()

      // Verify the likes count increases to 1
      await expect(blogElement.getByText('likes 1')).toBeVisible()
    })

    test('the user who created a blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('Blog to be deleted')
      await page.getByLabel('author').fill('Delete Tester')
      await page.getByLabel('url').fill('http://deletetest.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blogElement = page.locator('.blog').filter({ hasText: 'Blog to be deleted' }).first()
      await expect(blogElement).toBeVisible()

      await blogElement.getByRole('button', { name: 'view' }).click()

      // Set up the dialog listener BEFORE clicking remove
      // This tells Playwright: "When you see a dialog, click OK (accept)"
      page.on('dialog', async dialog => {
        // Verify the text inside the popup!
        expect(dialog.message()).toContain('Remove blog Blog to be deleted')
        await dialog.accept()
      })

      await blogElement.getByRole('button', { name: 'remove' }).click()

      await expect(page.locator('.blog').filter({ hasText: 'Blog to be deleted' })).not.toBeVisible()
      
      // Verify success notification appeared!
      await expect(page.getByText('Blog removed successfully')).toBeVisible()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('Creator Only Blog')
      await page.getByLabel('author').fill('Original Creator')
      await page.getByLabel('url').fill('http://creator.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blogElement = page.locator('.blog').filter({ hasText: 'Creator Only Blog' }).first()
      await expect(blogElement).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      // Create a brand new "Second User" in the backend database
      await request.post('/api/users', {
        data: {
          name: 'Second User',
          username: 'seconduser',
          password: 'secondpassword'
        }
      })

      await page.getByLabel('username').fill('seconduser')
      await page.getByLabel('password').fill('secondpassword')
      await page.getByRole('button', { name: 'login' }).click()
      
      await expect(page.getByText('Second User logged in')).toBeVisible()

      await blogElement.getByRole('button', { name: 'view' }).click()

      // Verify the remove button does NOT exist for this user
      await expect(blogElement.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered by likes in descending order', async ({ page }) => {
      // Create the first blog
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('The Underdog Blog')
      await page.getByLabel('author').fill('Author One')
      await page.getByLabel('url').fill('http://underdog.com')
      await page.getByRole('button', { name: 'create' }).click()
      
      await expect(page.locator('.blog').getByText('The Underdog Blog')).toBeVisible()

      // Create the second blog
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('The Champion Blog')
      await page.getByLabel('author').fill('Author Two')
      await page.getByLabel('url').fill('http://champion.com')
      await page.getByRole('button', { name: 'create' }).click()
      
      await expect(page.locator('.blog').getByText('The Champion Blog')).toBeVisible()

      const underdogBlog = page.locator('.blog').filter({ hasText: 'The Underdog Blog' })
      const championBlog = page.locator('.blog').filter({ hasText: 'The Champion Blog' })

      await underdogBlog.getByRole('button', { name: 'view' }).click()
      await underdogBlog.getByRole('button', { name: 'like' }).click()
      // Wait for the backend to update the UI before moving on
      await expect(underdogBlog.getByText('likes 1')).toBeVisible()

      await championBlog.getByRole('button', { name: 'view' }).click()
      await championBlog.getByRole('button', { name: 'like' }).click()
      await expect(championBlog.getByText('likes 1')).toBeVisible()
      
      await championBlog.getByRole('button', { name: 'like' }).click()
      await expect(championBlog.getByText('likes 2')).toBeVisible()

      // Verify the order using .nth()
      // The blog with 2 likes should be at the top (index 0)
      await expect(page.locator('.blog').nth(0)).toContainText('The Champion Blog')
      
      // The blog with 1 like should be underneath it (index 1)
      await expect(page.locator('.blog').nth(1)).toContainText('The Underdog Blog')
    })
  })
})