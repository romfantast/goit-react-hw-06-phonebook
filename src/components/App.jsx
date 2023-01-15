import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import css from './App.module.css';
import ContactsAppCaption from './ContactsAppCaption/ContactsAppCaption';
import ContactsForm from './ContactsForm/ContactsForm';
import InputFilterContact from './InputFilterContact/InputFilterContact';
import ContactsList from './ContactsList/ContactsList';

const MY_CONTACTS = 'my-contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(MY_CONTACTS)) ?? []
  );
  const [filter, setFilter] = useState('');

  const saveContactsToLs = contacts => {
    localStorage.setItem(MY_CONTACTS, JSON.stringify(contacts));
  };

  useEffect(() => {
    saveContactsToLs(contacts);
  }, [contacts]);

  const handleSubmitForm = (name, phone) => {
    const contactId = nanoid();
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return Notify.warning('This contact is already in the list');
    }
    const newContact = { id: contactId, name, phone };
    setContacts(prevContacts => [...prevContacts, newContact]);
    return true;
  };

  const handleFilterContact = e => {
    const { value } = e.target;
    setFilter(value);
  };
  const showFilteredContacts = () => {
    const filterStr = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterStr)
    );
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={css.contacts}>
      <ContactsAppCaption>Name</ContactsAppCaption>
      <ContactsForm handleSubmitForm={handleSubmitForm} />
      <InputFilterContact
        filter={filter}
        handleFilterContact={handleFilterContact}
      />
      <ContactsList
        showFilteredContacts={showFilteredContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
