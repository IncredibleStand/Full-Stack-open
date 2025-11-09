const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addPerson}>
    <div>
      <h1>add a new</h1>
      name: <input 
      value={newName}
      onChange={handleNameChange}/>
      <br />
      number: <input 
      value={newNumber}
      onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm