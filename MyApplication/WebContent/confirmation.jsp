<!DOCTYPE html>
<%@page import="db.DbManager"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html lang="en" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=yes" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--LINKS-->
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,300i,400" rel="stylesheet">  
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">      
		<link rel="stylesheet" type="text/css" href="css/confirmation.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<!-- Scroll to top on reload -->
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
				function hideURLbar(){ window.scrollTo(0,1); } </script>
		<title>Baby On Board | Order Success</title>
    </head>
    
    <body>
    
    	<!-- Login Validation -->
	    <script type="text/javascript">
	    	var loginStatus;
		    var loginStatus = <%=session.getAttribute("loginStatus")%>;
		    var contextPath = "<%=request.getContextPath()%>";
		    
		    // Proceed to logout if user not logged in
		    if(loginStatus != true){
		    	var logout_url =  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + contextPath + "/logout";
				window.location.href = logout_url;
		    }
		    
		    // Get customer details from session
		    var user = <%=session.getAttribute("customerDetails")%>;
	    </script>
    	
    	<!-- Page Validation -->
    	<script type="text/javascript">
			var result = "<%=request.getParameter("result")%>";
			
			if(!result || result == null || result == "null" || (result != "pass" && result != "fail")){
				var logout_url =  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + contextPath + "/logout";
				window.location.href = logout_url;
			}
		</script>
    
    	<!--HEADER SECTION -->
        <div class="header">
            <a id="logo-link" href="/index"> <img src="images/baby.png" alt="logo" class="logo"> </a>
            <ul class="main-nav">
                    <li><a href="#features">FEATURES</a></li>
                    <li><a href="#work">HOW IT WORKS</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                   <li><button id="user-button" class="user"><i class="fa fa-user-circle-o" style="font-size:30px;color:#fff;"></i>
                    <div class = "user_dropdown ">
						<ul class="dropdown_nav" >
							<li><a href="/userProfile" id="user_profile">User profile</a></li>
							<li><a href="/transactionHistory" id="transaction">Transaction history</a></li>
							<li><a href="/logout" id="logout_button">Logout</a></li>
						</ul>
						</div>
                    
                    </button></li>
            </ul>
        </div>
        
        <div class="success_msg">
	        <p class="order_success_msg">Order Successful <span class="glyphicon glyphicon-ok green"></span></p>
	        <p class="thankyou_msg"> Thank you for shopping with us</p>
	        <p class="delivery_msg">Your order would be arriving in 4-7 Business Days.</p>
	        
	        <a href="/index" class="continue_link" >Continue Shopping</a>
        </div>
        
        <div class="failure_msg hide">
	        <p class="order_failure_msg">Order Failed <span class="glyphicon glyphicon-remove red"></span></p>
	        <p class="sorry_msg">We apologize for the inconvenience.</p>
	        
	        <a href="/index" class="go_back red" >Go Back</a>
        </div>
        
        <script type="text/javascript" src="js/confirmation.js"></script>
    </body>
</html>