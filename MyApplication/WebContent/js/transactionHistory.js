
(function() {
	
	var transactions_loaded = 0;
	var frequencies = {'weekly': 'Weekly', 'bi-weekly': 'Bi-Weekly', 'monthly': 'Monthly'};
	var durations = {3: '3 Months', 6: '6 Months', 9: '9 Months', 12: '12 Months'};
	var active_sub_headers = [{'name':'name', 'display_name':'Subscription'},
			{'name':'ageGroupName', 'display_name': 'Age Group'},
			{'name':'startDate', 'display_name': 'Start Date'},
			{'name':'quantity', 'display_name': 'Quantity'},
			{'name':'frequency', 'display_name': 'Frequency'},
			{'name':'duration', 'display_name': 'Duration'}];
	var product_headers = [{"name": "name", "display_name": "Product"},
		   {"name": "brand", "display_name": "Brand"},
		   {"name": "category", "display_name": "Category"},
		   {"name": "quantity", "display_name": "Quantity"},
		   {"name": "amount", "display_name": "Number"},
		   {"name": "price", "display_name": "Price ($)"}];
	var transaction_headers = [{'name':'id', 'display_name':'Order No'},
		{'name':'paymentMode', 'display_name': 'Payment Mode'},
		{'name':'address', 'display_name': 'Billed Address'},
		{'name':'amount', 'display_name': 'Amount'},
		{'name':'transactionDate', 'display_name': 'Order Date'}];
	var trans_sub_headers = [{'name':'name', 'display_name':'Subscription Name'},
		{'name':'ageGroupName', 'display_name': 'Age Group'},
		{'name':'quantity', 'display_name': 'Quantity'},
		{'name':'status', 'display_name': 'Status'}];
	
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
	 *  Get active subscriptions success handler 
	 */
	function loadActiveSubscriptionsSuccessHandler(response){
		response = JSON.parse(response);
		
		if(response == null || response.length == 0){
			document.getElementById("Subscriptions").innerHTML += '<div class="te-al-ce">No Active Subscriptions to display.</div>';
			return;
		}
		
		for(var n = 0; n < response.length; n++){
			var subs_string = '<div class="item-container"><div class="item-heading"><ul class="item-heading-content">';
			
			for(var k = 0; k < active_sub_headers.length; k++){
				if(active_sub_headers[k].name == "frequency"){
					subs_string += '<li class="di-in-bl padding-5-10">' + active_sub_headers[k].display_name + ': ' + frequencies[response[n][active_sub_headers[k].name]] + '</li>';
				}
				else if(active_sub_headers[k].name == "duration"){
					subs_string += '<li class="di-in-bl padding-5-10">' + active_sub_headers[k].display_name + ': ' + durations[response[n][active_sub_headers[k].name]] + '</li>';
				}
				else{
					subs_string += '<li class="di-in-bl padding-5-10">' + active_sub_headers[k].display_name + ': ' + response[n][active_sub_headers[k].name] + '</li>';
				}
			}
			
			var product_string = '<div class="item-body"><table><tr>';
			
			product_string += '<th>S.No</th>';
			
			for(var i = 0; i < product_headers.length; i++){
				var header = product_headers[i];
				product_string += '<th>' + header.display_name + '</th>';
			}
			
			product_string += '<th>Total ($)</th>';
			product_string += '</tr>';
			
			var total = 0.0;
			var number = 0, price = 0;
			
			for(var i = 0; i < response[n].products.length; i++){
				var product_selected = response[n].products[i];
				
				product_string += '<tr>' + '<td>' + (i+1) + '</td>';
				
				for(var j = 0; j < product_headers.length; j++){
					var header = product_headers[j];
					
					if(header.name == "amount"){
						number = product_selected[header.name];
						product_string += '<td>' + product_selected[header.name] + '</td>';
					}
					else if(header.name == "price"){
						price = product_selected[header.name];
						product_string += '<td>' + Number(product_selected[header.name]).toFixed(2) + '</td>';
					}
					else{
						product_string += '<td>' + product_selected[header.name] + '</td>';
					}
				}
				
				total += number * price;
				
				product_string += '<td>' + Number(number * price).toFixed(2) + '</td>';
				product_string += '</tr>';
			}
			
			product_string += '</table></div>';
			
			subs_string += '<li class="di-in-bl padding-5-10">Total: $' + Number(total).toFixed(2) + '</li>';
			subs_string += '</ul></div>';
			
			var main_string = subs_string + product_string + '</div>';
			
			document.getElementById("Subscriptions").innerHTML += main_string;
		}
	}
	
	/*
	 *  Get active subscriptions
	 */
	function loadActiveSubscriptions(){
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	loadActiveSubscriptionsSuccessHandler(this.responseText);
	        }
	    };
	    
	    xhttp.open("GET", "GetActiveSubscriptions?id=" + user.id, true);
	    xhttp.send();
	}
	
	function init(){
		//Setting logout and logo path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
		var trasactionPath = contextPath +"/transactionHistory";
		var userPath = contextPath + "/userProfile";
		
	    document.getElementById("logout_button").setAttribute("href", logoutPath);
	    document.getElementById("transaction").setAttribute("href", trasactionPath);
	    document.getElementById("user_profile").setAttribute("href", userPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    
	    loadActiveSubscriptions();
	    addEventListeners();
	    renderCartDisplay();
	}
	
	/*
	 *  Load transactions success handler
	 */
	function loadTransactionsSuccessHandler(response){
		response = JSON.parse(response);
		
		if(response == null || response.length == 0){
			document.getElementById("Transaction").innerHTML += '<div class="te-al-ce">No Transactions to display.</div>';
			return;
		}
		
		for(var n = 0; n < response.length; n++){
			var trans_string = '<div class="item-container"><div class="item-heading"><ul class="item-heading-content">';
			
			for(var k = 0; k < transaction_headers.length; k++){
				if(transaction_headers[k].name == "amount"){
					trans_string += '<li class="di-in-bl padding-5-10">' + transaction_headers[k].display_name + ': $' + Number(response[n][transaction_headers[k].name]).toFixed(2) + '</li>';
				}
				else{
					trans_string += '<li class="di-in-bl padding-5-10">' + transaction_headers[k].display_name + ': ' + response[n][transaction_headers[k].name] + '</li>';
				}
			}
			
			trans_string += '</ul></div>';
			
			trans_string += '<div class="item-body"><table><tr>';
			
			trans_string += '<th>S.No</th>';
			
			for(var i = 0; i < trans_sub_headers.length; i++){
				var header = trans_sub_headers[i];
				trans_string += '<th>' + header.display_name + '</th>';
			}
			
			trans_string += '<th>&nbsp;</th>';
			trans_string += '</tr>';
			
			for(var i = 0; i < response[n].subscriptions.length; i++){
				var sub_selected = response[n].subscriptions[i];
				
				trans_string += '<tr>' + '<td>' + (i+1) + '</td>';
				
				for(var j = 0; j < trans_sub_headers.length; j++){
					var header = trans_sub_headers[j];
					
					if(header.name == "status"){
						trans_string += '<td>' + (sub_selected[header.name] ? "Active": "Cancelled") + '</td>';
					}
					else{ 
						trans_string += '<td>' + sub_selected[header.name] + '</td>';
					}
				}
				
				trans_string += '<td><a href="">View Details</a></td>';
				trans_string += '</tr>';
			}
			
			trans_string += '</table></div></div>';
			
			document.getElementById('Transaction').innerHTML += trans_string; 
		}
	}
	
	/*
	 *  Load user transactions 
	 */
	function loadTransactions(){
		if(transactions_loaded == 1){
			return;
		}
		
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	transactions_loaded = 1;
	        	loadTransactionsSuccessHandler(this.responseText);
	        }
	    };
	    
	    xhttp.open("GET", "GetTransactionInfo?id=" + user.id, true);
	    xhttp.send();
	}
	
	/*
	 *  Proceed to Cart checkout
	 */
	function proceedToCartCheckout(){
		if(localStorage.getItem("cartItems") == null){
			showPopupMessage("error", "Add items to cart before checkout!");
			return;
		}
		
		var cart = JSON.parse(localStorage.getItem("cartItems"));

		if(cart.length == 0){
			showPopupMessage("error", "Add items to cart before checkout!");
			return;
		}
		
		var checkout_url =  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + contextPath + "/checkout?type=cart";
		window.location.href = checkout_url;
	}
	
	/*
	 * 	Add event handlers to cart
	 */
	function initializeCartEvents(){
		var modal = document.getElementById('cart-modal');

		// Get the button that opens the modal
		var btn = document.getElementById("cart_btn");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		
		// When the user clicks the button, open the modal 
		btn.addEventListener("click", function(){			
			modal.style.display = "block";
		});
		   
		// When the user clicks on <span> (x), close the modal
		span.addEventListener("click", function(){	
			modal.style.display = "none";
		});
		
		// When the user clicks anywhere outside of the modal, close it
		window.addEventListener("click", function(event){
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		});
	}
	
	/*
	 *  Update cart model in UI
	 */
	function renderCartDisplay(){
		
		if(typeof(Storage) !== "undefined") {
			
			var cart_session_items = localStorage.getItem("cartItems");
			
			if(cart_session_items == null){
				return;
			}
			
			var cart = JSON.parse(cart_session_items);
			var cart_string = "";
			
			for(var p = 0; p < cart.length; p++){
				cart_string += '<tr><td>' + (p+1) + '</td>'
							+ '<td>' + cart[p].age_group_name + '</td>'
							+ '<td>' + cart[p].sub_name + '</td>'
							+ '<td>' + cart[p].quantity + '</td>'
							+ '<td>' + Number(cart[p].price).toFixed(2) + '</td>'
							+ '<td><button class="delete_cart" data-sub-id="' + cart[p].sub_id + '">Delete</button></td></tr>';
			}
			cart_string += '</tr>';
			
			document.getElementById("cart-table1").innerHTML = cart_string;
			
			// Update cart item count
			document.getElementById("cart-count").innerHTML = cart.length;
			
			// Delete from cart event listeners
			var cart_delete_buttons = document.getElementById("cart-table1").getElementsByClassName("delete_cart");
			
			for(var l = 0; l < cart_delete_buttons.length; l++){
				cart_delete_buttons[l].addEventListener("click", function(e){
					
					var sub_id = e.target.getAttribute("data-sub-id");
					var cart = JSON.parse(localStorage.getItem("cartItems"));
					
					for(var p = 0; p < cart.length; p++){
						if(cart[p].sub_id == sub_id){
							cart.splice(p,1);
						}
					}
					
					localStorage.setItem("cartItems", JSON.stringify(cart));
					renderCartDisplay();
				});
			}
		}
	}
	
	/*
	 *  Adding event listeners for page
	 */
	function addEventListeners(){
		initializeCartEvents();
		document.getElementById('transaction-label').addEventListener('click', loadTransactions);
		document.getElementsByClassName("cartCheckout_btn")[0].addEventListener("click", proceedToCartCheckout);
	}
	
	/*
	 *  Call initialize function on script execution
	 */
	init();
})();