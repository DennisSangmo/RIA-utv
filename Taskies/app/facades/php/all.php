<?php 
	$c = curl_init("http://dennissangmo.couchone.com/taskies/_design/taskie/_view/all");
	curl_exec($c);
	curl_close($c);
?>