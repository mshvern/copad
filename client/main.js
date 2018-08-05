import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { Meteor } from 'meteor/meteor'
import './main.html'
import { Codespaces } from '../imports/api/codespaces'
if (Meteor.isClient) {
  Template.editor.helpers({
    docid: function () {
      var doc = Codespaces.findOne()
      if (doc) {
        return doc._id
      } else {
        return undefined
      }
    },
    config: function () {
      return space => {
        space.setOption('lineNumbers', true)
        space.setOption('mode', 'javascript')
        space.setOption('theme', 'monokai')
      }
    }
  })
}
