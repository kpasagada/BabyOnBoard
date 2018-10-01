/**
 *  Functions for checkout page
 */

(function() {
	
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
	 *  Initializing horizontal tabs
	 */
	function initHorizontalTabs(){
		$('#horizontalTab').easyResponsiveTabs({
			type: 'default', //Types: default, vertical, accordion           
			width: 'auto', //auto or any width like 600px
			fit: true   // 100% fit in a container
		});
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
			});
		}
	}
	
	/*
	 *  Initializes event listeners for checkout page
	 */
	function initEventListeners(){
		document.getElementById("duration-dropdown").getElementsByClassName("dropbtn")[0].addEventListener("click", onDropdownButtonClick);
		document.getElementById("frequency-dropdown").getElementsByClassName("dropbtn")[0].addEventListener("click", onDropdownButtonClick);
		addEventListenersForDropdownItems();
	}
	
	/*
	 *  Initializes checkout page
	 */
	function initCheckout(){
		//Setting logout path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
	    document.getElementById("logout-button").getElementsByTagName("A")[0].setAttribute("href", logoutPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    
		initHorizontalTabs();
		closeDropdownsOnOutsideClick();
		initEventListeners();
	}
	
	/*
	 *  Call initialize function on document ready
	 */
	$(document).ready(initCheckout);
	
})();