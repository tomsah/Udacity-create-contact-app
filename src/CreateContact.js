import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    if(this.props.onCreateContact) {
      this.props.onCreateContact(values)
    }
  }
  render() {
    return(
      <div>
        <Link to='/' className='close-create-contact'> Close </ Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarUrl'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type="text" name='name' placeholder='name'/>
            <input type="text" name='handle' placeholder='handle'/>
            <button>add Contact</button>
          </div>
        </form>

      </div>
    )
  }
}

export default CreateContact