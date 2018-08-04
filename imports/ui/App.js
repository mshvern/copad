import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

// App component - represents the whole app
class App extends Component {
  render () {
    return (
      <div className="container">
        <header>
        </header>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks')
  return {
  }
})(App)
