        var account = {'1' : 'Dr.A', '2' : 'Dr.B'};
        
        function chat_send () {
            var chat_body = $('#chat_body').val();
            var key = $('#key').val();
            if (chat_body == '' || chat_body == ' ' || chat_body == '　') {
                alert('内容が入力されていません。');
                return false;
            } else {
                chat_ajax(chat_body, key);
            }
        }
        
        function chat_ajax (chat_body, key) {
            var data = {chat_body : chat_body, key : key, mode : 'send'};
            $.ajax({
                data : data, 
                type : 'POST', 
                url : './ajax.php', 
                success : function(req) {
                    $('#chat_body').val('');
                }
            });
        }
        
        function chat_get (){
            var timestamp = new Date().getTime();
            $.get("./chat.log?stamp="+timestamp, function(req){
                $("#reserve").html(req);
            });
            setTimeout("chat_get();",500);
        }// JavaScript Document