var btnLogin = document.getElementById("do-login");
var loginForm = document.getElementById("login-form");

btnLogin.onclick = function (event) {
  event.preventDefault(); // Prevent the default form submission
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Fetch user data from users.json
  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      return response.json();
    })
    .then((data) => {
      loginSuccess(username, data.user.type);
    })
    .catch((error) => {
      alert(error.message);
    });
};

function loginSuccess(username, userType) {
  var idLogin = document.getElementById("login");
  idLogin.innerHTML =
    "<p>We're happy to see you again, </p><h1>" + username + "</h1>";
  idLogin.innerHTML += "<p>You are logged in as " + userType + "</p>";

  // Redirect to main page or perform other actions based on user type
  if (userType === "customer") {
    window.location.href = "index.html"; // Redirect to customer main page
  } else if (userType === "seller") {
    window.location.href = "index.html"; // Redirect to seller main page
  } else if (userType === "admin") {
    window.location.href = "index.html"; // Redirect to admin main page
  }
  if (userType === "customer") {
    document.getElementById("sell-item").style.display = "none"; // Hide the button for customers
  } else {
    document.getElementById("sell-item").style.display = "block"; // Display the button for sellers and admins
  }

  // add the user to the localStorage
  localStorage.setItem("user", JSON.stringify({ username, userType }));
}
