import React, { Component } from 'react'
import { Codespaces } from '../api/codespaces'
import { Mongo } from 'meteor/mongo'
export default class Editor extends Component {
  handleChange (event) {
    // console.log(event.target.value)
    // console.log(event.target.getAttribute('data-codespace-id'))
    Codespaces.update(new Mongo.ObjectID(event.target.getAttribute('data-codespace-id')), {$set: {source: event.target.value}})
  }
  render () {
    return (
      <textarea className="editor" onChange={this.handleChange.bind(this)} data-codespace-id={this.props.id} value={this.props.source}/>
    )
  }
}
