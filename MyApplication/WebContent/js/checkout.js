/**
 *  Functions for checkout page
 */

(function() {
	
	var frequencies = {1: 'Weekly', 2: 'Bi-Weekly', 3: 'Monthly'};
	var durations = {3: '3 Months', 6: '6 Months', 9: '9 Months', 12: '12 Months'};
	var product_headers = [{"name": "name", "display_name": "Product"},
						   {"name": "brand", "display_name": "Brand"},
						   {"name": "category", "display_name": "Category"},
						   {"name": "quantity", "display_name": "Quantity"},
						   {"name": "amount", "display_name": "Number"},
						   {"name": "price", "display_name": "Price ($)"}];
	var subscribed_items = [];
	
	/*
	 *  Popup message rendering 
	 */
	function showPopupMessage(type, message){
		var messageElement = document.getElementById("pop-up-message");
		messageElement.classList.add(type);
		messageElement.innerHTML = message;
		messageElement.classList.add("visible");
		
		setTimeout(function(){
			messageElement.classList.remove("visible");
			messageElement.classList.remove(type);
		}, 4000);
	}
	
	/*
	 *  Toggling the dropdown 
	 */
	function onDropdownButtonClick() {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		for(var i = 0; i < dropdowns.length; i++){
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	    this.parentElement.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
	}

	/*
	 *  Close the dropdown menu if the user clicks outside of it
	 */
	function closeDropdownsOnOutsideClick(){
		
		window.onclick = function(event) {
			if (!event.target.matches('.dropbtn')) {
				var dropdowns = document.getElementsByClassName("dropdown-content");
				
				for(var i = 0; i < dropdowns.length; i++) {
					var openDropdown = dropdowns[i];
					if (openDropdown.classList.contains('show')) {
						openDropdown.classList.remove('show');
					}
				}
			}
		}
	}
	
	/*
	 *  Validate transcation details
	 */
	function validateTranscationDetails(event){
		var transaction_type = event.target.getAttribute("data-type");
		
		// Address validation
		var address = document.getElementById(transaction_type + "_addr").value;
		if(address.trim() == ""){
			showPopupMessage("error","Billing address is empty!");
			return false;
		}
		
		// Name on card validation
		var name_on_card = document.getElementById(transaction_type + "_name");
		if(name_on_card != null && name_on_card.value.trim() == ""){
			showPopupMessage("error","Name on card is empty!");
			return false;
		}
		
		// Card number validation
		var card_no = document.getElementById(transaction_type + "_no");
		if(card_no != null){
			// If card number is empty
			if(card_no.value.trim() == ""){
				showPopupMessage("error","Card number is empty!");
				return false;
			}
			
			// If card number format is invalid
			var regex = /^([0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4})$/g;
			if(!regex.test(card_no.value)){
				showPopupMessage("error","Card number format is invalid");
				return false;
			}
		}
		
		// Expiry date validation
		var exp_month = document.getElementById(transaction_type + "_exp_month");
		if(exp_month != null){
			// If expiry month is empty
			if(exp_month.value.trim() == ""){
				showPopupMessage("error","Expiry month is empty!");
				return false;
			}
			
			// If expiry month out of range
			if(parseInt(exp_month.value.trim()) < 1 || parseInt(exp_month.value.trim()) > 12){
				showPopupMessage("error","Expiry month is out of range!");
				return false;
			}
		}
		
		var exp_year = document.getElementById(transaction_type + "_exp_year");
		if(exp_year != null){
			// If expiry year is empty
			if(exp_year.value.trim() == ""){
				showPopupMessage("error","Expiry year is empty!");
				return false;
			}
			
			// If expiry year out of range
			if(parseInt(exp_year.value.trim()) < 1900 || parseInt(exp_year.value.trim()) > 2100){
				showPopupMessage("error","Expiry year is out of range! Allowed range [1900-2100]");
				return false;
			}
		}
		
		// CVV number validation
		var card_cvv = document.getElementById(transaction_type + "_cvv");
		if(card_cvv != null){
			// If CVV is empty
			if(card_cvv.value.trim() == ""){
				showPopupMessage("error","CVV Number is empty!");
				return false;
			}
			
			// If CVV has invalid format
			var regex = /^([0-9]{3})$/g;
			if(!regex.test(card_cvv.value)){
				showPopupMessage("error","CVV Number format is invalid!");
				return false;
			}
		}
		
		return false;
	}
	
	/*
	 *  Adds event listeners for payment submit button
	 */
	function addListenerForSubmitPayment(){
		var submit_elements = document.getElementsByClassName("submit-payment");
		for(var i = 0; i < submit_elements.length; i++){
			submit_elements[i].addEventListener("click", function(e){
				
				if(!validateTranscationDetails(e)){
					return false;
				}
				
				var xhr = new XMLHttpRequest();
				
				xhr.onreadystatechange = function() {
				    if(xhr.readyState == 4 && xhr.status == 200) {
				    	
				    	var response = JSON.parse(xhr.responseText);
				    	var result = "fail";
				    	if(response['status'] > 0){
				    		result = "pass";
				    	}
				    	
				    	var confirmation_url =  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + contextPath + "/confirmation?result=" +  result;
						window.location.href = confirmation_url;
				    }
				}
				
				xhr.open("POST", "CustomerSubscriptions", true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(subscribed_items));
			});
		}
	}
	/*
	 *  Initializing horizontal tabs
	 */
	function initHorizontalTabs(){
		$('#horizontalTab').easyResponsiveTabs({
			type: 'default', //Types: default, vertical, accordion           
			width: 'auto', //auto or any width like 600px
			fit: true   // 100% fit in a container
		});
		
		addListenerForSubmitPayment();
	}
	
	/*
	 *  Adds event listeners for dropdown contents
	 */
	function addEventListenersForDropdownItems(){
		var items = document.getElementsByClassName("dropdown-item");
		
		for(var j = 0; j < items.length; j++){
			var selected_item = items[j];
			selected_item.addEventListener("click",function(e){
				var parent = this.parentElement;
				parent.setAttribute("data-selected", this.getAttribute("data-val"));
				parent.parentElement.getElementsByClassName("dropbtn")[0].innerHTML = parent.getAttribute("data-name") + ": " + this.innerHTML;
				
				var sub_index = parent.parentElement.parentElement.parentElement.getAttribute("data-id");
				if(parent.getAttribute("data-name").toLowerCase() == "duration"){
					subscribed_items[sub_index]["duration"] = parseInt(this.getAttribute("data-val"));
				}
				else if(parent.getAttribute("data-name").toLowerCase() == "frequency"){
					subscribed_items[sub_index]["frequency"] = frequencies[this.getAttribute("data-val")].toLowerCase();
				}
			});
		}
	}
	
	/*
	 *  On subscription quantity change
	 */
	function onQuantityChange(e){
		var value = this.value;
		var sub_index = this.parentElement.parentElement.parentElement.getAttribute("data-id");
		subscribed_items[sub_index]['quantity'] = parseInt(value);
		
		var sub_total_element = this.parentElement.parentElement.parentElement.getElementsByClassName("sub-total")[0];
		var new_total = subscribed_items[sub_index]['quantity'] * subscribed_items[sub_index]['total'];
		var content = "Sub total: $" + Number(new_total).toFixed(2);
		sub_total_element.textContent = content;
	}
	
	/*
	 *  Fetch subscription details success handler
	 */
	function frameOrderDetailsSuccessHandler(response){
		response = JSON.parse(response);
		
		var order_details_string = '<div class="subscription-item" data-id="0">';
		
		order_details_string += '<div class="subscription-details">' +
								'<div class="wi-25-di-in-bk fo-we-bo">1. ' + response['name'] + '</div>' +
								'<div class="age-group wi-25-di-in-bk fo-si-13">Age Group: ' + response['ageGroupName'] + ' (' + response['ageGroupDescription'] + ')</div>' +
								'<div class="sub-quantity wi-10-di-in-bk fo-si-13">' +
								'<span class="di-in-bl">Quantity: </span>' +
								'<input id="quantity" class="di-in-bl ou-no input-value" type="number" value="1" name="quantity" min="1" max="10">' +
								'</div>' +
								'<div id="duration-dropdown" class="dropdown wi-15-di-in-bk fo-we-bo">' +
								'<button class="dropbtn">Duration: ' + durations[duration] + '</button>' +
								'<div id="duration-dropdown-content" class="dropdown-content" data-name="Duration" data-selected="' + duration + '">';
		
		// Framing Duration dropdown
		for(var j in durations){
			order_details_string += '<a class="dropdown-item" href="#" data-val="' + j + '">' + durations[j] + '</a>';
		}
		
		order_details_string += '</div>' +
								'</div>' +
								'<div id="frequency-dropdown" class="dropdown wi-15-di-in-bk fo-we-bo">' +
								'<button class="dropbtn">Frequency: ' + frequencies['1'] + '</button>' +
								'<div id="frequency-dropdown-content" class="dropdown-content" data-name="Frequency" data-selected="' + 1 + '">';
		
		// Framing Frequency drop down
		for(var k in frequencies){
			order_details_string += '<a class="dropdown-item" href="#" data-val="' + k + '">' + frequencies[k] + '</a>';
		}
		
		order_details_string += '</div>' +
								'</div>' +
								'</div>';
		
		order_details_string += '<div class="main">' +
								'<div>' + 
								'<table width="200" border="1">' +
								'<tbody>' +
								'<tr>';
		
		// Framing products table
		if(response.products && response.products.length){
			
			order_details_string += '<th scope="col">S.No</th>';
			
			for(var i = 0; i < product_headers.length; i++){
				var header = product_headers[i];
				order_details_string += '<th scope="col text-capitalize">' + header.display_name + '</th>';
			}
			
			order_details_string += '<th scope="col">Total ($)</th>';
			order_details_string += '</tr>';
			
			var total = 0.0;
			var number = 0, price = 0;
			
			for(var i = 0; i < response.products.length; i++){
				var product_selected = response.products[i];
				
				order_details_string += '<tr>' + 
										'<td>' + (i+1) + '</td>';
				
				for(var j = 0; j < product_headers.length; j++){
					var header = product_headers[j];
					if(header.name == "amount"){
						number = product_selected[header.name];
						order_details_string += '<td>' + product_selected[header.name] + '</td>';
					}
					else if(header.name == "price"){
						price = product_selected[header.name];
						order_details_string += '<td>' + Number(product_selected[header.name]).toFixed(2) + '</td>';
					}
					else{
						order_details_string += '<td>' + product_selected[header.name] + '</td>';
					}
				}
				
				total += number * price;
				
				order_details_string += '<td>' + Number(number * price).toFixed(2) + '</td>';
				order_details_string += '</tr>';
			}
			
			order_details_string += '</tbody></table></div></div>';
			order_details_string += '<div class="sub-total">Sub total: $' + Number(total).toFixed(2) + '</div>';
		}
		
		subscribed_items.push({
			customer_id: user.id,
			subscription_id: response['id'],
			frequency: frequencies['1'].toLowerCase(),
			duration: parseInt(duration),
			quantity: 1,
			start_date: new Date().toLocaleDateString(),
			total: total
		});
		
		order_details_string += '</div>';
		
		document.getElementById("cart-container").innerHTML += order_details_string;
		
		// Adding event listeners for dropdowns
		document.getElementById("duration-dropdown").getElementsByClassName("dropbtn")[0].addEventListener("click", onDropdownButtonClick);
		document.getElementById("frequency-dropdown").getElementsByClassName("dropbtn")[0].addEventListener("click", onDropdownButtonClick);
		addEventListenersForDropdownItems();
		document.getElementById("quantity").addEventListener("change", onQuantityChange);
		
	}
	
	/*
	 * Fetches subscription details from database
	 */
	function frameOrderDetails(){
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	frameOrderDetailsSuccessHandler(this.responseText);
	        }
	    };
	    
	    xhttp.open("GET", "GetSubscriptionInfo?subscription=" + subscriptionId, true);
	    xhttp.send();
	}
	
	/*
	 *  Initializes event listeners for checkout page
	 */
	function initEventListeners(){
		
	}
	
	/*
	 *  Initializes checkout page
	 */
	function initCheckout(){
		//Setting logout path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
		var transactionPath=contextPath + "/transactionHistory";
		var userPath=contextPath + "/userProfile";
		
	    document.getElementById("logout_button").setAttribute("href", logoutPath);
	    document.getElementById("transaction").setAttribute("href", transactionPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    document.getElementById("user_profile").setAttribute("href", userPath);
	    
	    frameOrderDetails();
		initHorizontalTabs();
		closeDropdownsOnOutsideClick();
		initEventListeners();
	}
	
	/*
	 *  Call initialize function on document ready
	 */
	$(document).ready(initCheckout);
	
})();