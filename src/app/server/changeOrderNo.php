<?php

require 'conn.php';

$taskId = $_POST['taskId'];
$newOrderNo = $_POST['newOrderNo'];

$sql = "UPDATE assign9_task SET orderNo = $newOrderNo WHERE id= $taskId;";

if (mysqli_query($conn, $sql)) {
    echo "Order Changed";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}


mysqli_close($conn);
?>
