$(function(){

  let buildHTML = function(message) {

    var image = (message.image) ? `<img class= "chat-main__message-list__image" src=${message.image} >` : "";

    if (image == "") {    
      let html = `<div class="chat-main__message" data-message-id="${message.id}"> 
                    <div class="chat-main__message-list__text1">
                      <div class="chat-main__message-list__text1_name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__text1__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__text2">
                      ${message.content}
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="chat-main__message" data-message-id="${message.id}"> 
                    <div class="chat-main__message-list__text1">
                      <div class="chat-main__message-list__text1_name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__text1__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__text2">
                      ${message.content}
                    </div>
                    <img class="chat-main__message-list__image">
                      ${image}
                  </div>`
      return html;
    }
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data) {
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('input').prop('disabled', false);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');
    })

    .fail(function() {
      alert('メッセージ送信に失敗しました');
    })
  });

  let reloadMessages = function() {
    let last_message_id = $('.chat-main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
          $('.chat-main__message-list').append(insertHTML);
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');
        });
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});