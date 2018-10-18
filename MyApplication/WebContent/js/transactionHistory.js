
(function() {
	
	
	function init(){
		//Setting logout and logo path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
		
	    document.getElementById("logout_button").getElementsByTagName("A")[0].setAttribute("href", logoutPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    
	}
	
	/*
	 *  Call initialize function on script execution
	 */
	init();
})();