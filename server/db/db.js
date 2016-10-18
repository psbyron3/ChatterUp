var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var assert = require('assert');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

mongoose.connect('mongodb://teamRamRod:cocacola1@ds027295.mlab.com:27295/chatmeup')



var ChatSchema = new mongoose.Schema({
  username     : { type: String, required: true, trim: true},
  content : { type: String, required: true, trim: true },
  chatRoomId : { type: String, required: true, trim: true },
  createdAt : { type: String, required: true, trim: true}
})

//ChatSchema.plugin(uniqueValidator);

var Chatroom = mongoose.model('Chatroom', ChatSchema)
var ObjectId = ChatSchema.ObjectId;

module.exports = Chatroom
