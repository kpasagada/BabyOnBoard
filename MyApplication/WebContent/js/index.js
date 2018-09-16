function regValidate() {

	var username = document.forms["regform"]["username"].value;
	var password = document.forms["regform"]["password"].value;
	var rpassword = document.forms["regform"]["retry-password"].value;
	
	if (username == "") {
        alert("username must be filled out");
        document.forms["regform"]["username"].focus();
        return false;
    }else if (password== "") {
        alert("password must be filled out");
        document.forms["regform"]["password"].focus();
        return false;
    }else if (rpassword == "") {
        alert("retry-password must be filled out");
        document.forms["regform"]["retry-password"].focus();
        return false;
    }else if(password != rpassword){
    	alert("password doesnt match");
        document.forms["regform"]["password"].focus();
        return false;
    }
}
function loginValidate(){
	var username = document.forms["loginform"]["username"].value;
	var password = document.forms["loginform"]["password"].value;
	
	if (username == "") {
        alert("username must be filled out");
        document.forms["loginform"]["username"].focus();
        return false;
    }else if (password== "") {
        alert("password must be filled out");
        document.forms["loginform"]["password"].focus();
        return false;
    }
}

function register(failed) {
	document.getElementById("login").style.display="none";
	document.getElementById("register").style.display="inline";
	if(failed == true){
		document.getElementById("incorrect-register").style.display="block";
	}
}

function login() {
	document.getElementById("login").style.display="inline";
	document.getElementById("register").style.display="none";
}

// Initialising the Index page
function initIndex(){
	if(loginStatus == true){
		document.getElementsByClassName("home")[0].style.display="none";
		document.getElementById("logout-button").classList.remove("hide");
	}
	else if(loginStatus == false){
		register(true);
	}
	
	//Setting logout path
	var logoutPath = contextPath + "/logout";
    document.getElementById("logout-button").getElementsByTagName("A")[0].setAttribute("href", logoutPath);
}

// Function call to initialise the index page
initIndex();
