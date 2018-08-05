import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Codespaces } from '../api/codespaces'
import {Meteor} from 'meteor/meteor'
import Editor from './Editor'
// App component - represents the whole app
class App extends Component {
  render () {
    return (
      <div className="container">
        <header>
          {/* The value is loading when the database hasn't been loaded on the client yet */}
          {this.props.codespace
            ? <Editor source={this.props.codespace.source } id={this.props.codespace._id}/>
            : <div>loading...</div>
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
