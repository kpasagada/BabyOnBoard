/**
 *  Functions for index page
 */

(function() {
	
	/*
	 * Validates registration form
	 */
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
	
	/*
	 * Validates login form
	 */
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
	
	/*
	 * Hides login form and shows register form
	 */
	function register(failed) {
		document.getElementById("login").style.display="none";
		document.getElementById("register").style.display="inline";
		if(failed == true){
			var incorrect_register_element = document.getElementById("incorrect-register");
			incorrect_register_element.classList.remove("hide");
		}
	}
	
	/*
	 *  Hides register form and shows login form
	 */
	function login() {
		document.getElementById("login").style.display="inline";
		document.getElementById("register").style.display="none";
	}
	
	function infants_F() {
		document.getElementById("sub_newborn").style.display="none";
		//document.getElementById("sub_infants").style.display="block";
		//document.getElementById("sub_toddlers").style.display="none";
	}
	
	/*
	 * Success handler for load age groups 
	 */
	function loadAgeGroupsSuccessHandler(response){
		
		response = JSON.parse(response);
		
		// Sorting by ids
		response.sort(function(a, b){return a['id'] - b['id']});
		
		// Framing html string to append to age groups container 
		var age_group_string = "";
		
		for (var i = 0; i < response.length; i++){
		    var age_group_object = response[i];
		    age_group_string += '<li>'
	        					+ '<a href="#"><img class="box-age" alt="' + age_group_object['name'] + '" src="images/' + age_group_object['name'].replace(" ","").toLowerCase() + '.jpg"></a>'
	        					+ '<p>' + age_group_object['name'] + '</p>'
	        					+ '</li>';
		}
		
		document.getElementById("age-group-list").innerHTML += age_group_string;
	};
	
	/*
	 * Fetches age groups from the database
	 */
	function loadAgeGroups(){
		
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	            loadAgeGroupsSuccessHandler(this.responseText);
	       }
	    };
	    
	    xhttp.open("GET", "AgeGroups", true);
	    xhttp.send(); 
	}
	
	/*
	 *  Initializing the Index page
	 */
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
	    
	    loadAgeGroups();
	}
	
	/*
	 *  Function call to initialize the index page
	 */
	initIndex();

})();