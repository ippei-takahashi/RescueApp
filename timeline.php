<!DOCTYPE html>
<meta cherset = "UTF-8">
<link rel="stylesheet" href="css/layout.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/base.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/clock.css" type="text/css" media="screen" />
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/redmond/jquery-ui.css">
<html lang="ja">
<head>
    <title>TIMELINE</title>
</head>
<body>
<div id="wrapper">
<?
error_reporting(E_ALL & ~E_NOTICE);
include("./config.php");
include("./bar_data.php");

//データの受け取り
$loginid             = ($_POST['loginid']) ? $_POST['loginid'] : '';
$loginpass           = ($_POST['loginpass']) ? $_POST['loginpass'] : '';
$key           	     =  $key_array[$loginid];
$tlflag			 	 = ($_POST['tlflag']) ? $_POST['tlflag'] : '';

//ログインチェック
$loginflag         = ($loginid == $account[$key]['loginid'] && $loginpass == $account[$key]['loginpass'] && $loginid != '' && $loginpass != '') ? 1 : 0 ;
$viewflag 		  = $loginflag + $tlflag;

?>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/get_time.js"></script>
    <script>
        var account = {'1' : 'DrA', '2' : 'DrB', '3' : 'DrC'};
        
        function chat_send () {
            var chat_body = $('#chat_body').val();
            var bar_body = $('#bar_body').val();
            var key = $('#key').val();
            if (chat_body == '' || chat_body == ' ' || chat_body == '　') {
                alert('内容が入力されていません。');
                return false;
            } else {
                chat_ajax(chat_body,bar_body, key);
            }
        }
        
        function chat_ajax (chat_body,bar_body, key) {
            var data = {chat_body : chat_body, bar_body : bar_body, key : key, mode : 'send'};
            $.ajax({
                data : data, 
                type : 'POST', 
                url : './ajax.php', 
                success : function(req) {
                    $('#chat_body').val('');
                    $('#bar_body').val('');					
                }
            });
        }
        
        function chat_get (){
            var timestamp = new Date().getTime();
            $.get("./chat.log?stamp="+timestamp, function(req){
                $("#reserve").html(req);
            });
            setTimeout("chat_get();",500);
        }
        
        <? if ($viewflag >= 1) : ?>
            $(function(){
                chat_get();
            });
        <? endif ; ?>
    </script>

	<h1>FUJIFILM INTERN NO.2 MEDICAL APP</h1>
    <? if ($viewflag == 0) : //ログインしてない場合?>
        <fieldset class="loginform">
            <legend>ログインフォーム</legend>
            <form action="<?=$_SERVER['PHP_SELF'];?>" method="post">
            ID：<input type="text" name="loginid"><br />
            PASS：<input type="text" name="loginpass"><br />
             <input type="hidden" name="tlflag" value="<?=$tlflag;?>">
            <input type="submit" class="submit" value="LOGIN">
        </fieldset>
    <? elseif ($viewflag == 1) : $tlflag =1; //TOP画面?>
    
            <div id="header">
  			<input class="right_area"type="button" value="<?=$account[$key]['name'];?>&nbsp;－LOGOUT" onclick="MoveCheck();" />
            <fieldset>
                <span id="reserve"  class="new">
                    <?
                        if (!is_file($file_path)) {
                            echo 'タイムラインログはありません。';
                        }
                    ?>
                </span>
            </fieldset>
			</div>
            
		<div id="clock" class="light">
			<div class="display">
				<div class="weekdays"></div>
				<div class="digits"></div>
			</div>
		</div>

		<div id="arrowArea" class="arrow_area">            
        	<ul>


				<? for ($i = 1; $i <= count($bar)-1; ++$i) : 
				$hour = substr($bar[$i],8,2);
				$hour_now = date('H');
				if($hour_now < 5 && $hour >= 19){
				$hour = $hour - $hour_now - 19;
				}else{
				$hour =  $hour - $hour_now + 5;
				}
				$min  = substr($bar[$i],10,1);
				$pos  = floor(100/6 * $hour + 25/9 * $min);
				$pos_array  = $pos_array . $pos; 
				?>
                <li><script type="text/javascript">			
                document.write('<img class="arrow<?=$pos;?>"src="img/icon/arrow.png">');
				</script>
                <style type="text/css">
				.arrow_area ul li img.arrow<?=$pos;?> {
				left:<?=$pos;?>%;
				}
				</style>
				</li>
				<? endfor; ?> 	

                
			</ul>  
        </div>
		<div id="main">
			<table class="window_bar">
				<tr>
					<td class="green">&nbsp;</td>
					<td class="yellow">&nbsp;</td>
					<td class="orange">&nbsp;</td>
					<td class="red">&nbsp;</td>
					<td class="green">&nbsp;</td>
					<td class="yellow">&nbsp;</td>
				</tr>
				<tr>
					<td><p class="time"><script type="text/javascript">get_hour(5);</script></p></p></td>
					<td><p class="time"><script type="text/javascript">get_hour(4);</script></p></p></td>
					<td><p class="time"><script type="text/javascript">get_hour(3);</script></p></p></td>
					<td><p class="time"><script type="text/javascript">get_hour(2);</script></p></p></td>
					<td><p class="time"><script type="text/javascript">get_hour(1);</script></p></p></td>
					<td><p class="time"><script type="text/javascript">get_hour(0);</script></p></td>
				</tr>
			</table>
		</div>
		<div id="imgRow" class="img-row">
			<ul>
				<li><div data-time="21:45"><img src="img/0/0000.jpg"></div></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li><div data-time="22:07"><img src="img/1/0000.jpg"></div></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li><div data-time="23:18"><img src="img/2/0000.jpg"></div></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li><div data-time="24:23"><img src="img/3/0000.jpg"></div></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
			<ul>
				<li></li>
				<li></li>			
				<li></li>			
				<li></li>		
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
    <div id="footer">
	<div id="footer_inner">
			<ul>
				<li class="move"><form  action="<?=$_SERVER['PHP_SELF'];?>" method="post"   >
                <input type="hidden" name="key" id="key" value="<?=$key;?>">
                <input type="hidden" name="loginid" value="<?=$loginid;?>">
                <input type="hidden" name="loginpass" value="<?=$loginpass;?>">
                <input type="hidden" name="tlflag" value="<?=$tlflag;?>">
                <input type="submit" class="move_tl" value="TIMELINE">
                </form></li>
				<li class="mode"><a href="#">MODE</a></li>
				<li class="profile">PROFILE</li>
				<li class="upload">UPLOAD</li>

			</ul>
		</div>
	</div>
    </div>
    <? else : $tlflag =0;//タイムライン?>
    <div id="header">
    <input class="right_area" type="button" value="<?=$account[$key]['name'];?>&nbsp;－LOGOUT" onclick="MoveCheck();" />
	</div>
        <div>
            <fieldset class="timeline">
            <div>
                <span id="reserve">
                    <?
                        if (!is_file($file_path)) {
                            echo 'タイムラインログはありません。';
                        }
                    ?>
                </span>
            </div>
            </fieldset>
        </div>
        <br>
            <form class="tweet" acthon="<?=$SERVER['PHP_SELF'];?>" method="post" name="chat_form">
                <textarea name="chat_body" id="chat_body" 	rows="3" cols="80"></textarea><br />
                <input type="hidden" name="mode" value="send">
                <input type="hidden" name="key" id="key" value="<?=$key;?>">                
                <input type="hidden" name="loginid" value="<?=$loginid;?>">
                <input type="hidden" name="loginpass" value="<?=$loginpass;?>">
                <input type="button" class="submit"value="TWEET" onClick="return chat_send();">
            </form>
            
        </div><!-- end #main -->
    <div id="footer">
	<div id="footer_inner">
			<ul>
				<li class="move"><form  action="<?=$_SERVER['PHP_SELF'];?>" method="post" >
                <input type="hidden" name="key" id="key" value="<?=$key;?>">
                <input type="hidden" name="loginid" value="<?=$loginid;?>">
                <input type="hidden" name="loginpass" value="<?=$loginpass;?>">
                <input type="hidden" name="tlflag" value="<?=$tlflag;?>">
                <input type="submit" class="move_tl" value="TOP">
                </form></li>
				<li class="mode"><a href="#">MODE</a></li>
				<li class="profile">PROFILE</li>
				<li class="upload">UPLOAD</li>
			</ul>
		</div>
	</div>
    </div>
    <? endif;?> 

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.0.0/moment.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/clock.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/movecheck.js"></script>
</body>
</html>