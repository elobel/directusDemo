"use client";

import React, { useState, useEffect } from 'react';
import directus from '../../lib/directus';

const Contacts = (props) => {
  const [contacts, setContacts] = useState([])
  const [firstNameValue, setFirstNameValue] = useState('')

  useEffect( () => { 
    async function fetchData() {
      try {
        const newContacts = await directus.items('contacts').readByQuery({
          fields: ['id', 'first_name', 'email', 'company'],
        });
        setContacts(newContacts.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function handleChange(event){
    setFirstNameValue(event.target.value)
  }

  async function submitHandler(e) {
    await directus.items('contacts').updateOne(1, {
      first_name: firstNameValue,
    });
  };


  function displayContacts() {
    return (
      <ul>
      {contacts.map(contact => {
        return (
          <li key={contact.id}>
            <h2>{contact.first_name}</h2>
            <span>{contact.company} &bull; {contact.email}</span>
          </li>
        )
      })}
      </ul>
    )

  }

  let displayedContacts = displayContacts()
  return (
    <div>
      <h1>Contacts</h1>
      {displayedContacts}
      <form onSubmit={submitHandler}>
        <div>
          <label>Change First Name of First Contact: </label>
          <input
            type='text'
            value={firstNameValue}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Change First Name of First Contact</button>
      </form>

    </div>
  );
}


export default Contacts