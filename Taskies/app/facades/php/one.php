<?php 
	$ch = curl_init("http://dennissangmo.couchone.com/taskies/_design/taskie/_view/byId?key=\"".$_POST['id']."\"");
	curl_exec($ch);
	curl_close($ch);
?>