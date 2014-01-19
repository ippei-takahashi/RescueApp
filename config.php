<?
//セッションの開始
session_start();

$file_path       = "./chat.log";
$file_path2      = "./bar.log";
$file_path3      = "./bar_data.php";
$key_array         = array(
								'id1' => '1', 
                                'id2' => '2', 														
                                'id3' => '3', 
                        );

$account         = array(
                            '1' => array(	
								'name' => 'DrA', 
                                'loginid' => 'id1', 														
                                'loginpass' => 'pass1', 
                            ), 
                            '2' => array(
								'name' => 'DrB', 
                                'loginid' => 'id2',							 
                                'loginpass' => 'pass2',
                            ), 
                            '3' => array(
								'name' => 'DrC', 
                                'loginid' => 'id3',							 
                                'loginpass' => 'pass3',								
                            ),
                        );
?>