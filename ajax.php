<?
//セッションの開始
session_start();

error_reporting(E_ALL & ~E_NOTICE);
include("./config.php");

if ($_POST['mode'] == 'send' && $_POST['chat_body']) {
    $body = str_replace('*', '＊', $_POST['chat_body']);
    $body = str_replace('@_@', '＠＿＠', $body);
    $chat_body = '<div class="' . $account[$_POST['key']]['name'] . '">
		' . '[' . $account[$_POST['key']]['name'] . ']&nbsp
        ' . '[' . date('Y/m/d H:i:s') . ']<br>
        ' . $_POST['chat_body'] . '</div>' . '<hr>'; 
    if (is_file($file_path)) {
        $chat_log   = file_get_contents($file_path);
        $chat_body  = $chat_body . $chat_log;
        $bar_log    = file_get_contents($file_path2);
		$bar_body   = ',' . date('YmdHis');
		$bar_body   = $bar_body . $bar_log;
		$bar_array  = '<? $bar = array(0';
		$bar_array2 = ');?>';
		$bar_data   = $bar_array . $bar_body . $bar_log . $bar_array2;		
    }
	
    file_put_contents($file_path, $chat_body, LOCK_EX);
    file_put_contents($file_path2, $bar_body, LOCK_EX);
    file_put_contents($file_path3, $bar_data, LOCK_EX);
    echo 1;
} else {
    echo 0;
}
?>
