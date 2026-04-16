<?php
// array 
$marks = array(55, 47, 78, 96, 55);

// foreach
echo "<h3>Student Marks:</h3>";
foreach ($marks as $m) {
    echo $m . "<br>";
}

// total, average, max, min
$total = 0;
$max = $marks[0];
$min = $marks[0];

foreach ($marks as $m) {
    $total += $m;

    if ($m > $max) {
        $max = $m;
    }

    if ($m < $min) {
        $min = $m;
    }
}

// Type casting (explicit)
$count = (int) count($marks);

// functions
function calculateAverage($total, $count) {
    return $total / $count;
}

$average = calculateAverage($total, $count);

echo "<h3>Statistics:</h3>";
echo "Total: $total <br>";
echo "Average: $average <br>";
echo "Maximum: $max <br>";
echo "Minimum: $min <br>";


// pass and fail
$pass = 0;
$fail = 0;

// check pass/fail
function isPass($mark) {
    if ($mark >= 50) {
        return true;
    } else {
        return false;
    }
}

foreach ($marks as $m) {
    if (isPass($m)) {
        $pass++;
    } else {
        $fail++;
    }
}

echo "<h3>Result:</h3>";
echo "Passed Students: $pass <br>";
echo "Failed Students: $fail <br>";

// Associative array
$student = array(
    "name" => "Dipto",
    "id" => "23-54051-3",
    "cgpa" => 3.94
);

echo "<h3>Student Details:</h3>";
foreach ($student as $key => $value) {
    echo "$key : $value <br>";
}

// String operations
$name = $student["name"];
$upperName = strtoupper($name); 
$nameLength = strlen($name);    

echo "<h3>String Operations:</h3>";
echo "Original Name: $name <br>";
echo "Uppercase Name: $upperName <br>";
echo "Name Length: $nameLength <br>";


// array function (sort)
sort($marks);

echo "<h3>Sorted Marks:</h3>";
foreach ($marks as $m) {
    echo $m . "<br>";
}


// Superglobal ($_GET)
$userInput = isset($_GET['username']) ? $_GET['username'] : "Guest";

echo "<h3>User Input:</h3>";
echo "Hello, " . htmlspecialchars($userInput) . "!";

?>