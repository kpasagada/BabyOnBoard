
(function() {
	
	
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
	    
	}
	
	/*
	 *  Call initialize function on script execution
	 */
	init();
})();