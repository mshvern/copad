import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import './main.html'
import { Codespaces } from '../imports/api/codespaces'
if (Meteor.isServer) {
  if (!Codespaces.findOne()) {
    Codespaces.insert({'source': "console.log('Hello, Copad!')"})
  }
}

Template.editor.rendered = function () {
  console.log('rendered!')
  let editor = CodeMirror.fromTextArea(this.find('#codearea'), {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'blackboard'
  })
  editor.getDoc().setValue('var msg = "Hi";')
  editor.on('change', () => console.log('callback from change'))
}
