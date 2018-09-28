/**
 *  Functions for index page
 */

(function() {
	
	var age_groups, selected_age_group = 1, selected_subscription = -1, selected_duration = -1;
	
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
	
	/*
	 * Success handler for load age groups 
	 */
	function loadAgeGroupsSuccessHandler(response){
		
		response = JSON.parse(response);
		
		// Sorting by ids
		response.sort(function(a, b){return a['id'] - b['id']});
		age_groups = response;
		
		// Framing html string to append to age groups container 
		var age_group_string = "";
		
		for (var i = 0; i < response.length; i++){
		    var age_group_object = response[i];
		    age_group_string += '<li class="' + (age_group_object['id'] == selected_age_group? 'selected-age':'')  + '" data-id="' + age_group_object['id'] + '">'
	        					+ '<button type="button" class="age_border pointer"><img class="box-age" alt="' + age_group_object['name'] + '" src="images/' + age_group_object['name'].replace(" ","").trim().toLowerCase() + '.jpg"></button>'
	        					+ '<p class="size"><br> ' + age_group_object['name'] + '</p>'
	        					+ '</li>';
		}
		
		var age_group_list_element = document.getElementById("age-group-list");
		age_group_list_element.innerHTML += age_group_string;
		
		// Selecting an age group with click
		age_group_list_element.addEventListener("click", function(e){
			if(e.target && (e.target.tagName == "IMG" || e.target.tagName == "BUTTON")){
				age_group_list_element.getElementsByClassName("selected-age")[0].classList.remove("selected-age");
				
				var parentNode;
				if(e.target.parentNode.tagName == "LI"){
					parentNode = e.target.parentNode;
				}
				
				if(e.target.parentNode.parentNode.tagName == "LI"){
					parentNode = e.target.parentNode.parentNode;
				}
				
				parentNode.classList.add("selected-age");
				selected_age_group = parentNode.getAttribute("data-id");
				
				var inner_sub_elements = document.getElementsByClassName("inner-subscription-container");
				
				for(var k = 0; k < inner_sub_elements.length; k++){
					if(inner_sub_elements[k].getAttribute("data-age") == selected_age_group){
						inner_sub_elements[k].classList.remove("hide");
					}
					else{
						inner_sub_elements[k].classList.add("hide");
					}
				}
				
				if(document.getElementsByClassName("sub-selected").length){
					document.getElementsByClassName("sub-selected")[0].classList.remove("sub-selected");
				}
				selected_subscription = -1;
			}
		});
		
		loadPredefinedSubscriptions();
	};
	
	/*
	 *  Fetch age group by id
	 */
	function getAgeGroupById(id){
		for(var i = 0; i < age_groups.length; i++){
			if(age_groups[i]['id'] == id){
				return age_groups[i]['name'];
			}
		}
		
		return "";
	}
	
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
	 *  Success handler for predefined subscriptions
	 */
	function loadPredefinedSubscriptionsSuccessHandler(response){
		
		var subscription_desc = {
			'premium': ["High-grade products", "Free Home Delivery", "24/7 Customer service"],
			'standard': ["Conventional products", "Home Delivery within a week", "24/7 Customer service"],
			'economical': ["Quality budget-friendly products", "Home Delivery at $5", "24/7 Customer service"]
		};
		
		response = JSON.parse(response);
		
		response.sort(function(a, b){return a['ageGroup'] - b['ageGroup']});
		
		var subscription_list_string = "";
		var age_group_visited = [];
		
		for (var i = 0; i < response.length; i++){
			var sub_object = response[i];
			var sub_total = 0;
			var sub_age_group_name = getAgeGroupById(sub_object['ageGroup']);
			
			for(var j = 0; j < sub_object['products'].length; j++){
				sub_total += sub_object['products'][j].price * sub_object['products'][j].amount; 
			}
			
			if(i%3 == 0){
				subscription_list_string += '<div class="inner-subscription-container" data-age="' + sub_object['ageGroup'] + '" class="' + (sub_object['ageGroup'] == selected_age_group? '':'hide') + '">' +
											'<ul class="subscription">' +
											'<h2>Choose a subscription for ' + sub_age_group_name.replace(" ","") + '</h2>' +
											'<div class="border"></div>';
			}
			
			subscription_list_string += '<div class="subscription-box">' +        			
										'<ul class="card" data-id="' + sub_object['id'] + '">' +
										'<li><h3>' + sub_object['name'].toUpperCase() + '</h3></li><br>' +
										'<li class="border1"></li>' +
										'<li><h3 class="price">$' + sub_total + ' </h3><span>/ pack</span></li><br>' +
										'<li>' + subscription_desc[sub_object['name'].toLowerCase()][0] + '</li><br>' +
										'<li>' + subscription_desc[sub_object['name'].toLowerCase()][1] + '</li><br>' +
										'<li>' + subscription_desc[sub_object['name'].toLowerCase()][2] + '</li><br>' +
										'<li>' + sub_object['products'].length + ' Product package</li><br>' + 
										'<li><button type="button" class="subscription_button pointer">SELECT</button></li>'+
										'</ul>' +
										'</div>';
			
			if(i%3 == 2){
				age_group_visited.push(sub_object['ageGroup']);
				subscription_list_string += '</ul></div>';
			}
		}
		
		var subscription_list_element = document.getElementById("subscription-container");
		subscription_list_element.innerHTML = subscription_list_string;
		
		// Event handler for subscription select action
		var subscription_buttons = document.getElementsByClassName("subscription_button");
		
		for(var l = 0; l < subscription_buttons.length; l++){
			subscription_buttons[l].addEventListener("click", function(e){
				if(e.target && e.target.tagName == "BUTTON"){
					if(document.getElementsByClassName("sub-selected").length){
						document.getElementsByClassName("sub-selected")[0].classList.remove("sub-selected");
					}
					e.target.parentNode.parentNode.classList.add("sub-selected");
					selected_subscription = e.target.parentNode.parentNode.getAttribute("data-id");
				}
			});
		}
	}
	
	/*
	 *  Fetches predefined subscription data
	 */
	function loadPredefinedSubscriptions(){
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	loadPredefinedSubscriptionsSuccessHandler(this.responseText);
	        }
	    };
	    
	    xhttp.open("GET", "PredefinedSubscriptions", true);
	    xhttp.send();
	}
	
	/*
	 *  Function to initialize all event listeners 
	 */
	function initEventListeners(){
		document.getElementById("login-button").addEventListener("click", login);
		document.getElementById("sign-up-button").addEventListener("click", register);
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
		
		//Setting logout path and checkout page path
		var logoutPath = contextPath + "/logout";
		var checkoutPath = contextPath + "/checkout"
	    document.getElementById("logout-button").getElementsByTagName("A")[0].setAttribute("href", logoutPath);
	    document.getElementsByClassName("checkout_btn")[0].setAttribute("href", checkoutPath);
	    
	    loadAgeGroups();
	    initEventListeners();
	}
	
	/*
	 *  Function call to initialize the index page
	 */
	initIndex();

})();