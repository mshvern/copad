import { Meteor } from 'meteor/meteor'
import { Codespaces } from '../imports/api/codespaces'
Meteor.startup(() => {
  if (!Codespaces.findOne()) { // no documents yet!
    Codespaces.insert({
      title: 'my new document'
    })
  }
})
