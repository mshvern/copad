import {ShareJS} from 'meteor/edemaine:sharejs'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
this.Documents = new Mongo.Collection('documents')
this.Outputs = new Mongo.Collection('outputs')

if (Meteor.isServer) { this.Outputs.insert({content: 'console.log'}) }
