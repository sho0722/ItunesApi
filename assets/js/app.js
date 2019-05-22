$(function () {
  $("#search-btn").on("click", function() {
    //検索ボタンがクリックされたら

    //itunesに曲の検索をしに行く（Ajax）

    $.ajax({
      //データの通信をするところ
      url: "https://itunes.apple.com/search", //通信用URL
      type: "GET", //GET送信　or　POST送信
      dataType: "jsonp", //検索結果の形式
      data: {
        term: "スピッツ",
        country: "jp",
      }

    }).done( (data) => {
      //通信が成功したとき
      console.log(data);

    }).fail((error) => {
      // 通信が失敗したとき
      console.log(error);
      
    })
  })
})