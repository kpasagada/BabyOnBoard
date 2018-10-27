
(function() {
	
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
	 *  Initializes user profile page
	 */
	function init(){
		//Setting logout and logo path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
		var trasactionPath=contextPath +"/transactionHistory";
		var userPath=contextPath + "/userProfile";
		
	    document.getElementById("logout_button").setAttribute("href", logoutPath);
	    document.getElementById("user_profile").setAttribute("href", userPath);
	    document.getElementById("transaction").setAttribute("href", trasactionPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    
	    renderCartDisplay();
	    initializeCartEvents();
	}
	
	/*
	 *  Call initialize function on script execution
	 */
	init();
})();