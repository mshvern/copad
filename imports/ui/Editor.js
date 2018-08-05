import React, { Component } from 'react'
import { Codespaces } from '../api/codespaces'
import { Mongo } from 'meteor/mongo'
import ReactDOM from 'react-dom'
export default class Editor extends Component {
  handleChange (event) {
    // This event only gets executed on the page
    // That does the change
    event.preventDefault()
    let node = ReactDOM.findDOMNode(this)
    let oldLength = node.value.length
    let oldIdx = node.selectionStart
    Codespaces.update(new Mongo.ObjectID(event.target.getAttribute('data-codespace-id')), {$set: {source: event.target.value}})
    let newIdx = Math.max(0, node.value.length - oldLength + oldIdx)
    node.selectionStart = node.selectionEnd = newIdx
  }
  componentDidUpdate () {
    // This event gets fired every time someone changes 
    // The value of the current codespace source
    let node = ReactDOM.findDOMNode(this)
    let oldLength = node.value.length
    let oldIdx = node.selectionStart
    if (node.value.slice(0, oldIdx + 1) === node.defaultValue.slice(0, oldIdx + 1)) {
      node.value = node.defaultValue
      node.selectionStart = node.selectionEnd = oldIdx
    } else {
      node.value = node.defaultValue
      let newIdx = Math.max(0, node.value.length - oldLength + oldIdx)
      node.selectionStart = node.selectionEnd = newIdx
    }
    // IF SOMEONE TYPES BEFORE ME
    // I SHOULD GET PUSHED
    // IF SOMEONE TYPES AFTER ME
    // I SHOULDN'T
    // newIdx == pushing, oldIdx == not pushing
  }
  render () {
    return (
      <textarea className="editor" onChange={this.handleChange.bind(this)} data-codespace-id={this.props.id} defaultValue={this.props.source}/>
    )
  }
}
