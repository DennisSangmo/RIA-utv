<?php 
	switch($_POST['type']){
		case "name":
			$strarr = explode(" ", $_POST['text']);
			/*$str = "{'key':[";
			foreach($i in $strarr){
				//TODO multi key!
			}*/
			$ch = curl_init("http://dennissangmo.couchone.com/taskies/_design/taskie/_view/byWordInName?key=\"".$strarr[0]."\"");
		break;
		case "tag":
			$strarr = explode(",", $_POST['text']);
			/*$str = "{'key':[";
			foreach($i in $strarr){
				//TODO multi key!
			}*/
			$ch = curl_init("http://dennissangmo.couchone.com/taskies/_design/taskie/_view/byTag?key=\"".$strarr[0]."\"");
		break;
	}
	
	curl_exec($ch);
	curl_close($ch);
?>