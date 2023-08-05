function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "help" && password == "us") {
        alert("login successfully");
        return false;

    } else {
        alert("login failed");
    }

}