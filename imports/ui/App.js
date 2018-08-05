import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Codespaces } from '../api/codespaces'
import {Meteor} from 'meteor/meteor'
import Editor from './Editor'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
// App component - represents the whole app
class App extends Component {
  getHighlightedCode (rawCode) {
    rawCode = rawCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
    rawCode = hljs.highlight('javascript', this.props.codespace.source).value
    rawCode = rawCode.replace(/\n/g, '<br />')
    return rawCode
  }
  render () {
    return (
      <div className="container">
        <header>
          {/* The value is loading when the database hasn't been loaded on the client yet */}
          {this.props.codespace
            ? <div><Editor source={this.props.codespace.source} id={this.props.codespace._id}/> <div className="javascript" dangerouslySetInnerHTML={{__html: this.getHighlightedCode(this.props.codespace.source)}}/></div>
            : <div className="editor">{'loading...'}</div>
          }
        </header>
      </div>
    )
  }
}
export default withTracker(() => {
  Meteor.subscribe('codespaces')
  return {
    codespace: Codespaces.findOne({current: true})
  }
})(App)
