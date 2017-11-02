import React, { Component } from 'react'
import Link from './Link'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class LinkList extends Component {

_getLinksToRender = (isNewPage) => {
  if (isNewPage) {
    return this.props.allLinksQuery.allLinks
  }
  const rankedLinks = this.props.allLinksQuery.allLinks.slice()
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
  return rankedLinks
}

_nextPage = () => {
  const page = parseInt(this.props.match.params.page, 10)
  if (page <= this.props.allLinksQuery._allLinksMeta.count / 5) {
    const nextPage = page + 1
    this.props.history.push(`/new/${nextPage}`)
  }
}

_previousPage = () => {
  const page = parseInt(this.props.match.params.page, 10)
  if (page > 1) {
    const previousPage = page - 1
    this.props.history.push(`/new/${previousPage}`)
  }
}

componentDidMount() {
  this._subscribeToNewLinks()
  this._subscribeToNewVotes()
}


_updateCacheAfterVote = (store, createVote, linkId) => {
  const isNewPage = this.props.location.pathname.includes('new')
  const page = parseInt(this.props.match.params.page, 10)
  const skip = isNewPage ? (page - 1) * 5 : 0
  const first = isNewPage ? 5 : 100
  const orderBy = isNewPage ? "createdAt_DESC" : null
  const data = store.readQuery({  variables: { first, skip, orderBy } })

  const votedLink = data.allLinks.find(link => link.id === linkId)
  votedLink.votes = createVote.link.votes
  store.writeQuery({  data })
}






render() {

  if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
    return <div>Loading</div>
  }

  if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
    return <div>Error</div>
  }

  const isNewPage = this.props.location.pathname.includes('new')
  const linksToRender = this._getLinksToRender(isNewPage)
  const userId = localStorage.getItem(GC_USER_ID)

  return (
    <div>
    
        <button onClick={() => {
          this.props.history.push('/login')
        }}>Login</button> 
        <div>
          <button onClick={() => {
            this.props.history.push('/create')
          }}>New Post</button>
          <button onClick={() => {
            localStorage.removeItem(GC_USER_ID)
            localStorage.removeItem(GC_AUTH_TOKEN)
            this.forceUpdate() // doesn't work as it should :(
          }}>Logout</button>
        </div>
     
      <div>
        {linksToRender.map((link, index) => (
          <Link key={link.id} updateStoreAfterVote={this._updateCacheAfterVote} link={link} index={index}/>
        ))}
      </div>
      {isNewPage &&
      <div>
        <button onClick={() => this._previousPage()}>Previous</button>
        <button onClick={() => this._nextPage()}>Next</button>
      </div>
      }
    </div>
  )

}


}


// 3
export default LinkList




