import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/perons";
import noteService from "./services/person";
import Notification from "./components/notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ message: null, type: "" });

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      noteService
        .create(nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${response.data.name}`, "success");
        })
        .catch((error) => {
          showNotification("failed to add person. Please try again");
        });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      noteService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${name}`, "success");
        })
        .catch((error) => {
          showNotification(
            `Failed to delete ${name}. It may have already been removed.`,
            "error"
          );
        });
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: "" }), 5000);
  };

  const handleNameChange = (evnet) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const personToShow = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h2>Numbers</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons personToShow={personToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;

