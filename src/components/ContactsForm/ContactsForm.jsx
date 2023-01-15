import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContactsAppCaption from 'components/ContactsAppCaption/ContactsAppCaption';
import css from './ContactsForm.module.css';

const ContactsForm = ({ handleSubmitForm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleContactData = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const getContactFormData = e => {
    e.preventDefault();

    if (handleSubmitForm(name, phone)) {
      setName('');
      setPhone('');
    }
  };

  return (
    <form onSubmit={getContactFormData} className={css.form}>
      <div className={css.inputWrapper}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters"
          required
          value={name}
          onChange={handleContactData}
        />
      </div>
      <ContactsAppCaption>Number</ContactsAppCaption>
      <div className={css.inputWrapper}>
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits"
          required
          onChange={handleContactData}
          value={phone}
        />
      </div>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

ContactsForm.propTypes = {
  handleSubmitForm: PropTypes.func.isRequired,
};

export default ContactsForm;
