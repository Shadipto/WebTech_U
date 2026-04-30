<?php
header("Content-Type: application/json");

// Array 
$students = 
[
    [
        "id" => "STU001",
        "name" => "Dev Da",
        "department" => "Challange Science",
        "cgpa" => 3.77
    ],
    [
        "id" => "STU002",
        "name" => "Jeet Da",
        "department" => "Information Technology",
        "cgpa" => 3.92
    ],
    [
        "id" => "STU003",
        "name" => "Salmon Bhoi",
        "department" => "Foothpath Engineering",
        "cgpa" => 3.78
    ],
    [
        "id" => "STU004",
        "name" => "Lord Emran",
        "department" => "Biology",
        "cgpa" => 3.88
    ],
    [
        "id" => "STU005",
        "name" => "King Shakib Khan",
        "department" => "Charukola FDC",
        "cgpa" => 4.00
    ]
];


echo json_encode($students);
?>