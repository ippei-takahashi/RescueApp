// JavaScript Document<script type="text/javascript"><!--
   function MoveCheck() {
      // 確認ダイアログを表示
      var res = confirm("本当にログアウトしますか？");
      // 選択結果で分岐
      if( res == true ) {
         // OKなら移動
         window.location = "timeline.php";
      }
      else {
         // キャンセルならダイアログ表示
         alert("ログアウトがキャンセルされました");
      }
   }
