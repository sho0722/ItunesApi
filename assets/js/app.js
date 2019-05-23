//カードの雛形
let cardTemplate = null;

$(function () {

  //検索ボタンがクリックされたら
  $("#search-btn").on("click", function() {

    //card.htmlを読み込む
    $.get("../../card.html", function(temp){
      cardTemplate = $(temp);
    })

    //検索ワードを取得する
    let searchWord = $("#search-word").val();

    //itunesに曲の検索をしに行く（Ajax）

    $.ajax({
      //データの通信をするところ
      url: "https://itunes.apple.com/search", //通信用URL
      type: "GET", //GET送信　or　POST送信
      dataType: "jsonp", //検索結果の形式(html, xmlなど、jsonは連想配列)
      data: {
        term: searchWord,
        country: "jp",
      }

    }).done( (data) => {
      //通信が成功したとき

      //resultの子要素を空にする
      $("#result").empty();

      
      for (item of data.results) {

         //CDの画像を所得
        let imgPath = item.artworkUrl100;
        //CDのタイトルを所得
        let collectionName = item.collectionName;
        // iTunesのリンクを所得
        let collectionViewUrl = item.collectionViewUrl;

        //変数にtemplateのクローンを入れる
        let clone = $(cardTemplate).clone();

        // 画像のパスを追加する
        clone.find(".card-img-top").attr("src", imgPath);

        // CDのタイトルを追加する
        clone.find(".card-s").text(collectionName);

        // iTunesのリンクを追加する
        clone.find(".btn-primary").attr("href", collectionViewUrl);

        // cloneをresultに追加する
        $("#result").append(clone);

      }

    }).fail( (error) => {
      // 通信が失敗したとき
      console.log(error);

    })
  })
})