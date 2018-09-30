/**
 *  Functions for checkout page
 */

(function() {
	
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
	 *  Initializes checkout page
	 */
	function initCheckout(){
		//Setting logout path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
	    document.getElementById("logout-button").getElementsByTagName("A")[0].setAttribute("href", logoutPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    
		initHorizontalTabs();
	}
	
	/*
	 *  Call initialize function on document ready
	 */
	$(document).ready(initCheckout);
	
})();