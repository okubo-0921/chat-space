$(function(){

  function buildHTML(message){

    if (message.image) {
      var html = `<div class="chat-main__message-list__text1">
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
                  <img class="chat-main__message-list__image" src=${message.image} >
                </div>`
    } else {
      var html = `<div class="chat-main__message-list__text1">
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
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('input').prop('disabled', false);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })

    .fail(function() {
      alert('メッセージ送信に失敗しました');
    })
  });
});