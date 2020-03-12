$(function() {

  function appendUser(user) {
    let html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `;
    $("#user-search-result").append(html);
  }

  function appendNotUser() {
    let html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>
              `;
    $("#user-search-result").append(html);
  }

  function  deleteUserList(user, id) {
    let html = `
              <div class="chat-group-user clearfix" id="${id}">
                <p class="chat-group-user__name">${user}</p>
                <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${user}">削除</div>
              </div>
            `;
    $(".js-add-user").append(html)
  }

  function  addMember(id) {
    let html =`
              <input value="${id} "name="group[user_ids][]" type="hidden" id="group_user_ids_${id}" />
              `;
    $(`#${id}`).append(html);
  }

  $("#user-search-field").on("keyup", function() {

    let input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();

      // 値が入っていた場合
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });

      } else if (input.length ==0) {
        return false;

      //値が入っていなかった場合
      } else {
        appendNotUser();
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました')
    });
  });

  $(document).on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    
      deleteUserList(userName, userId);
      addMember(userId);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });

});