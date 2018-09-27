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
		var incorrect_register_element = document.getElementById("incorrect-register");
		incorrect_register_element.classList.remove("hide");
	}
}

function login() {
	document.getElementById("login").style.display="inline";
	document.getElementById("register").style.display="none";
}

function infants_F() {
	document.getElementById("sub_newborn").style.display="none";
	//document.getElementById("sub_infants").style.display="block";
	//document.getElementById("sub_toddlers").style.display="none";
}

// Initializing the Index page
function initIndex() {
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

// Function call to initialize the index page
initIndex();
