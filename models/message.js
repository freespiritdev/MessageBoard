const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');
const dataFilePath = path.join(__dirname, '../data/messages.json');
const moment = require('moment');

//working in Postman
exports.getAll = function(callback){
  fs.readFile(dataFilePath, (err, buffer) => {
    if(err) {
      callback(err);
      return;
    }

    let messages;

    try{
      messages = JSON.parse(buffer);
    }catch(err) {
      callback(err);
      return;
    }
    callback(null, messages);
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
    messageObj.timestamp = moment();

    if(err) return callback(err);
    
    messageObj.id = uuid.v4()// Unique ID

    messages.push(messageObj); //update

    fs.writeFile(dataFilePath, JSON.stringify(messages), function(err) {
      callback(err);
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