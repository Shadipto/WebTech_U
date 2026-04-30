function loadData() {
  // Show loading message
  document.getElementById("result").innerHTML =
    '<p class="loading">Loading student data...</p>';

  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("GET", "data.php", true);

  // Handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      var students = JSON.parse(xhr.responseText);

      var html = "";

      for (var i = 0; i < students.length; i++) {
        var student = students[i];
        html +=
          '<div class="student-card">' +
          "<p><strong>Student ID:</strong> " +
          student.id +
          "</p>" +
          "<p><strong>Name:</strong> " +
          student.name +
          "</p>" +
          "<p><strong>Department:</strong> " +
          student.department +
          "</p>" +
          "<p><strong>CGPA:</strong> " +
          student.cgpa +
          "</p>" +
          "</div>";
      }

      document.getElementById("result").innerHTML = html;
    } else {
      // Handle error
      document.getElementById("result").innerHTML =
        '<div class="error">Error: Unable to load data (Status: ' +
        xhr.status +
        ")</div>";
    }
  };

  // Handle request errors
  xhr.onerror = function () {
    document.getElementById("result").innerHTML =
      '<div class="error">Error: Unable to connect to server</div>';
  };

  // Send the request
  xhr.send();
}
