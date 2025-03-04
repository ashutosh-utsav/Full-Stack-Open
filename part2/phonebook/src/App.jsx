import { useState, useEffect } from "react";
import contactService from "./services/persons";
import Notification from "./components/Notifications";
import Error from "./components/Error";






const Filter = ({ filterStr, handleFilter }) => {
  return (
    <input placeholder="Filter..." value={filterStr} onChange={handleFilter} />
  );
};

const PersonForm = ({
  newName,
  newNumber,
  addContact,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name:{" "}
        <input placeholder="Name" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input
          type="tel"
          placeholder="Contact"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <>
        <button type="submit">add</button>
      </>
    </form>
  );
};

const Persons = ({ phoneBook, filterStr, handleDeletion }) => {
  return (
    <>
      {phoneBook
        .filter((person) =>
          person.name.toLowerCase().includes(filterStr.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDeletion(person)}
            >
              delete
            </button>
          </div>
        ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notif, setNotif] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    contactService.getAll().then((contacts) => {
      setPersons(contacts);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  const addContact = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      alert("yeah naur Oi need both name and number");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedContact = { ...existingPerson, number: newNumber };
        contactService
          .updateContact(existingPerson.id, updatedContact)
          .then((updated) => {
            setPersons(
              persons.map((person) =>
                person.id === updated.id ? updated : person
              )
            );
            setNewName("");
            setNewNumber("");
            setNotif(
              `Changed ${existingPerson.name}'s number from ${existingPerson.number} to ${updatedContact.number}`
            );
            setTimeout(() => {
              setNotif(null);
            }, 5000);
          })
          .catch(() => {
            setError(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
          });

        return;
      }
    }

    if (persons.some((person) => person.number === newNumber)) {
      alert(
        `Seems like ${newName} has the same phone number as somebody else, welp might wanna check that out chief`
      );
  
    }
    const newContact = { name: newName, number: newNumber };

    contactService.create(newContact).then((response) => {
      setPersons(persons.concat(response));
      setNotif(`Added ${newContact.name}`);
      setTimeout(() => {
        setNotif(null);
      }, 5000);
    });

    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9+\- ]/g, "");
    setNewNumber(inputValue);
  };

  const handleDeletion = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      contactService
        .removeContact(person.id)
        .then((deleted) =>
          setPersons(persons.filter((person) => deleted.id !== person.id))
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} />
      <Error message={error} />
      filter shown with{" "}
      <Filter filterStr={newFilter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        phoneBook={persons}
        filterStr={newFilter}
        handleDeletion={handleDeletion}
      />
    </div>
  );
};

export default App;
