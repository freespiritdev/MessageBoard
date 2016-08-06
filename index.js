require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const path = require('path');   
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Message = require('./models/message');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());
app.use(express.static('public'));



app.get('/',(req, res, next) => {
  Message.getAll(function (err, messages) {
    res.render('index', { title: "Message Board", messages}) // for index.pug
  });
});

app.route('/messages')
  .get((req, res) => {

    Message.getAll(function(err, messages) {
      if(err) {
        res.status(400).send(err);
      }else {
        res.send(messages)
      }
    });
  })
  .post((req, res) => {
    Message.create(req.body, function(err){
      if(err) {
        res.status(400).send(err);
      } else {
        res.send()
      }
    });
  });


app.route('/messages/:id')
  .get((req, res) => {
    res.send(`I'm message #${req.params.id}!`);
  })
  .put((req, res) =>  {
    let MessageId = req.params.id;
    let updateObj = req.body;

    Message.update(MessageId, updateObj, function(err, newMessage) {
      res.status(err ? 400 : 200).send(err || newMessage);
    });
  })
  .delete((req, res) => {
    let MessageId = req.params.id;

    Message.remove(MessageId, err => {
      res.status(err ? 400 : 200).send(err);
    });
  })

  app.post('/messages', (req, res) => {
    Message.create(req.body, err => {
      if(err) return res.status(400).send(err);
      res.send(); 
    });
  });


// app.get('/timestamp', (req, res) => {
//   res.send({timestamp: Date.now() }); //Date has to be wrapped in an object
// });

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});


