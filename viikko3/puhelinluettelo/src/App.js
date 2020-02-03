import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PForm from './components/PForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personSearch, setPersonSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name ===newName)){
      if(window.confirm(`${newName} has been already saved, want to change number?`)){
        const updatePerson = persons.find(i => i.name ===newName)
        updatePerson.number= newNumber
        personService.changeNumber(updatePerson)
        .then(returnedP=> {
        setPersons(persons.map(person => person.name !== updatePerson ? person : returnedP))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`${returnedP.name} number is changed`)
      }).catch(error => {
        setErrorMessage('Changing number failed')
      })
  }
    }else {
      personService.create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${newPerson.name}`)
      }).catch(error => {
        console.log(error.response.data);
        setErrorMessage(error.response.data.error)
      })
    }
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    }, 5000);
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete =(id) =>{
    if(window.confirm(`Are you sure you want to remove? `)){
    personService.deletePerson(id)
    .then(()=>{
      const newPersonList = persons.filter(person => person.id!==id)
      setPersons(newPersonList)
      setNotificationMessage(`Person deleted succesfully`)
    })
    .catch(error => {
      setErrorMessage('Deleting person failed')
    })
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
  }, 5000);
}
}

  const handleFilterChange = (event) => {
    const value = event.target.value
    setPersonSearch(value)
  }
  return (
    <div>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
      <h2>Phonebook</h2>
      <div>
      <Filter filter={personSearch} onChange={handleFilterChange} />
      </div>
      <PForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <ul>
          <Persons persons={persons} filter={personSearch} handleDelete={handleDelete}/>
        </ul>
    </div>
  )

}
export default App;
