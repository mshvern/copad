import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import './main.html'
import { Codespaces } from '../imports/api/codespaces'

Template.editor.helpers({

  'editorOptions': function () {
    return {
      lineNumbers: true,
      theme: 'blackboard',
      mode: 'javascript'
    }
  },

  'editorCode': function () {
    return 'Copad!'
  }

})
