/**
 *  Functions for confirmation page
 */

(function() {
	
	/*
	 *  Initializes confirmation page
	 */
	function initConfirmation(){
		//Setting logout and logo path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
		
	    document.getElementById("logout-button").getElementsByTagName("A")[0].setAttribute("href", logoutPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    document.getElementsByClassName("continue_link")[0].setAttribute("href", indexPath);
	    document.getElementsByClassName("go_back")[0].setAttribute("href", indexPath);
	    
	    // Show success or failure
	    if(result == "fail"){
		    document.getElementsByClassName("success_msg")[0].classList.add("hide");
		    document.getElementsByClassName("failure_msg")[0].classList.remove("hide");
	    }
	}
	
	/*
	 *  Call initialize function on script execution
	 */
	initConfirmation();
})();