const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return Math.max(...blogs.map(blog => blog.likes))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Step 1: Count blogs per author
  // Result looks like: { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2 }
  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  // Step 2: Find the author with the highest count
  return Object.keys(authorCounts).reduce((best, author) => {
    const count = authorCounts[author]
    return count > best.blogs 
      ? { author, blogs: count } 
      : best
  }, { blogs: 0 }) // Initial value
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // Step 1: Sum likes per author
  // Result looks like: { 'Michael Chan': 7, 'Edsger W. Dijkstra': 17 }
  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  // Step 2: Find the author with the most likes
  return Object.keys(authorLikes).reduce((best, author) => {
    const likeCount = authorLikes[author]
    return likeCount > best.likes
      ? { author, likes: likeCount }
      : best
  }, { likes: 0 })
}

// Check out Lodash


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
