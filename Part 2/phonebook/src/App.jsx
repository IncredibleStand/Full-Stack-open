import { useState, useEffect } from 'react'
import phoneService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Phonebook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  
  const showNotification = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 5000)
  }

  useEffect(() => {
    phoneService
    .getAll()  
      .then(initialData => setPersons(initialData))
      .catch(() => showNotification('Failed to fetch phonebook data', 'error'))

  }, [])

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) return showNotification('Name and number cannot be empty', 'error')

    // Check for duplicates
    const existingPerson = persons.find( p => p.name.trim().toLowerCase() === name.trim().toLowerCase())

    // Using PATCH
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added. Replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number } // only patch the number

        phoneService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
            clearInputs()
            showNotification(`Updated number for ${returnedPerson.name}`)
          })
          .catch(() => showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error'))
      }
      return
    }

    phoneService
      .create({ name, number })
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        clearInputs()
        showNotification(`Added ${newPerson.name}`)
      })
      .catch(() => showNotification('Failed to add person', 'error'))
  }
  
  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return alert("Person does not exist");

    if(!window.confirm(`Delete ${person.name} ?`)) return

    phoneService
      .remove(id)
      .then(() => setPersons(persons => persons.filter(p => p.id !== id)))
      .catch(() => showNotification(`Failed to delete ${person.name}`, 'error'))
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter}/>
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        handleNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={e => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
     <Phonebook persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App