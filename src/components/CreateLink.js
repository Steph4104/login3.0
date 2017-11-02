import React, { Component } from 'react'

//import { GC_USER_ID } from '../constants'
import { LinkList } from './LinkList'
import { GC_USER_ID} from '../constants'


class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <button
          onClick={() => this._createLink()}
        >
          Submit
        </button>
      </div>
    )
  }

_createLink = async () => {
  const postedById = localStorage.getItem(GC_USER_ID)
  if (!postedById) {
    console.error('No user logged in')
    return
  }
  const { description, url } = this.state
  await this.props.createLinkMutation({
    variables: {
      description,
      url,
      postedById
    },
    update: (store, { data: { createLink } }) => {
      const first = 5
      const skip = 0
      const orderBy = 'createdAt_DESC'
      const data = store.readQuery({
        
        variables: { first, skip, orderBy }
      })
      data.allLinks.splice(0,0,createLink)
      data.allLinks.pop()
      store.writeQuery({
        
        data,
        variables: { first, skip, orderBy }
      })
    }
  })
  this.props.history.push(`/new/1`)
}


}


// 3
export default CreateLink

