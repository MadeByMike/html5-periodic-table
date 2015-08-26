<?php
$url=$_GET["website"];
$url = "http://".$url;
$html = file_get_contents($url);

$doc = new DOMDocument();
$doc->loadHTML($html);
$list = array();
foreach($doc->getElementsByTagName('*') as $element ){
	array_push($list, $element->tagName);
}
echo json_encode(array_unique($list))
// foreach(array_unique($list) as $l) {
// 	echo $l."<br />";
// }
?>