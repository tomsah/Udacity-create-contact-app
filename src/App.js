import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state ={
    contacts: [],
  }

  componentDidMount () {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState({contacts})
    })
  }
  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((prevState) =>({contacts: [...prevState.contacts, contact]}))
    })
  }

  removeContact = (contact) => {
    console.log(contact)
    this.setState((currentState) => ({
        contacts: currentState.contacts.filter( c => c.id !== contact.id )
    }))
    ContactsAPI.remove(contact)
  }


  render() {
    const {contacts } = this.state
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path='/create' render={({history }) =>(
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>

      </div>
    );
  }
}

export default App;
