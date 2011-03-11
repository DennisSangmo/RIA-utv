<?php 
	$ch = curl_init("http://dennissangmo.couchone.com/taskies/");
	curl_setopt ($ch, CURLOPT_POST, 1);
	curl_setopt ($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/json"));
	curl_setopt ($ch, CURLOPT_POSTFIELDS, $_POST['json']);
	curl_exec($ch);
?>