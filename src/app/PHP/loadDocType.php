<?php

header("Content-Type:text/html;charset=utf-8");
header('Access-Control-Allow-Origin: http://localhost:4200', false);

$url = 'http://www.chatbot.hk/DrCare.DoctorCategory.api.php?Key=63ebdad609d02ac15a71bde64fb21f8ea43ac513';

$json = file_get_contents($url);

echo $json;

?>