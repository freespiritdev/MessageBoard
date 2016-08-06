const connection = require('../config/db');

const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');
const squel = require('squel').useFlavour('mysql');
const dataFilePath = path.join(__dirname, '../data/messages.json');
const moment = require('moment');
const postDate = moment();

connection.query(`create table if not exists messages (
    name varchar(100),
    post varchar(255),
    id int
  )`, err => {
    if(err) {
      console.log('table create err:', err);
    }
  })

exports.getAll = function(callback) {
  // let time = moment().format("YYYY-MM-DD HH:mm");
  // let sql = squel.select().from('messages').toString();

  connection.query('select * from messages', (err, messages) => {
    callback(err, messages);
  });
}

//working in Postman
exports.getById = (id, callback) => {
  seeMessages((err, messages) => {
    if(err) return callback(err);
    callback(null, cats);
  });
}

//create is working in Postman
exports.create = function(messageObj, callback) {
  exports.getAll(function(err, messages) {
    messageObj.posted_at = moment();

    if(err) return callback(err);
    messageObj.time = moment().format("YYYY-MM-DD HH:mm");
    messageObj.id = uuid.v4()// Unique ID

    messages.push(messageObj); //update

    connection.query(`insert into messages 
      (posts,name,time,id)
      VALUES
      ("${messageObj.posts}","${messageObj.posted_at}")`, 
      (err, messages) => {
      console.log(err || messages)
      callbackb(err, message)
    });
  });
}

//Update is working Postman
exports.update = (id, updateObj, callback) =>{
  exports.getAll(function(err, messages) {
    if(err) return callback(err);

    let message = messages.filter(message => message.id === id)[0];

    if(!message) { 
      return callback({error: "Message not found."});
    }

    let index = messages.indexOf(message);

     for(let key in updateObj) { 
        message[key] = updateObj[key]; 
      }  
    
    messages[index] = message;

    fs.writeFile(dataFilePath, JSON.stringify(messages), function(err){//stringify
      if(err) return callback(err);
      
      callback(null, message);
    });
  })
}
//working in Postman
exports.remove = function(messageId, callback) {
  exports.getAll(function(err, messages) { //read and parse
    if(err) return callback(err);

    messages = messages.filter(message => message.id !== messageId); //keep all the cats not equal to that idea and it will delete the one we want

    fs.writeFile(dataFilePath, JSON.stringify(messages), function(err){
      callback(err);
    })
  });
}