const Person = ({ person, onDelete }) =>(      
     <p>
        {person.name} {person.number}
        <button onClick={() => onDelete(person.id)}>delete</button>
      </p>
)

const Phonebook = ({ persons, removePerson }) => (
  <div>
    {persons.map(person => <Person key={person.id} person={person} onDelete={removePerson} />)}
  </div>
)

export default Phonebook