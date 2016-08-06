'use strict'

console.log("Hey!");

$(() => {
  $('table').on('click', '.delete', deleteMessage);
  $('.add').click(add);

});


function getMessages() {
  $.get('/messages')
  .done(data => {
    let $messages = data.map(lis);
    $('.message').empty().append($messages);
  })
}

function lis(message) {
  let $message = $('.template').clone();
  $message.removeClass('template');
  $message.find('.message').text(message.post);
  $message.find('.timestamp').text(message.timestamp);
  $message.data('id', message.id);
  return $message;
}

function deleteMessage(){
  console.log("Message Deleted!");

  let messageId = $(this).closest('li').data('id');

  $.ajax(`/messages/${messageId}`, {
    method: 'DELETE'
  })
  .done(() => {
    console.log("Success!");
    renderList();
  })
  .fail(err => {
    console.log('err:', err);
  });
}

function renderList() {
  $.get('/messages')
  .done(messages => {

    let $lis = messages.map(message => {
      let $li = $('template').clone();
      $li.removeAttr('id');
      $li.find('.post').text(message.post);
      $li.find('.timestamp').text(message.timestamp);
      return $li
    })
    $('#messageList').empty().append($li);
  });
}