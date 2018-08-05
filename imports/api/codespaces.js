import { Mongo } from 'meteor/mongo'
import {Meteor} from 'meteor/meteor'
export const Codespaces = new Mongo.Collection('codespaces')
if (Meteor.isServer) {
  if (Codespaces.findOne({})) {
    Meteor.publish('codespaces', function codespacePublication () {
      return Codespaces.find()
    })
  }
}
