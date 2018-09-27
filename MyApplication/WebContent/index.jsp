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
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<title>Baby On Board | Landing</title>
    </head>
    
    <body>
    
	    <!-- Login Validation -->
	    <script type="text/javascript">
	    	var loginStatus;
		    var loginStatus = <%=session.getAttribute("loginStatus")%>;
		    var contextPath = "<%=request.getContextPath()%>";
	    </script>
	    
		<!-- Database Connection -->
		<%
			DbManager db = new DbManager();
			Connection conn = (Connection) db.getConnection();
		%>
	
		<!--HEADER SECTION -->
        <div class="header">
            <a href="bob.html"> <img src="images/baby.png" alt="logo" class="logo"> </a>
            <ul class="main-nav">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#work">How it works</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li id="logout-button" class="hide"><a href="/logout">Logout</a></li>
            </ul>
        </div>
        
        <!--LANDING PAGE-->
        <div class="home">
           <form id="login" name="loginform" action="LoginController" method="post" onsubmit="return loginValidate()" >
                 <h1 style="text-align:center;"><img class="human" src="images/human.png"/> <br><br>LOGIN</h1>
                 <input type="text" name="username" class="login" placeholder="Username">
                 <input type="password" name="password" class="login" placeholder="Password">
                 <button type="submit" class="login" name="submit" value="login">Login</button>
                 <h3 style="text-align:center;"> Forgot Your Password? <br><br></h3>
                 <button type="button" onclick="register()" class="button" style="padding: 0px 56px;" > Not a registered user yet? Sign Up!</button>
           </form>
           <form id="register" name="regform" action="LoginController" method="post" onsubmit="return regValidate()">
           	 <p id="incorrect-register" class="te-al-ce hide">Login details invalid, register to continue!</p>
             <h1 class="te-al-ce"><img class="human" src="images/human.png"/> <br><br>REGISTER</h1>
             <input type="text" name="name" class="register" placeholder="Full Name">
             <input type="text" name="email" class="register" placeholder="Email Address">
             <input type="number" name="phone" class="register" placeholder="Phone Number">
             <input type="text" name="username" class="register" placeholder="Username">
             <input type="password" name="password" class="register" placeholder="Password">
             <input type="password" name="retry-password" class="register" placeholder="Confirm Password">
             <button type="submit" name="submit" class="register" value="register">Register</button>
             <button type="button" onclick="login()" class="button" style="padding: 15px 85px;" > Already registered? LOGIN</button>
           </form>
        </div>
        
        <!--AGE CATEGORY-->
        <div>
            <ul class="age">
                <h2>Choose a category</h2>
                <li>
                    <a href="#"><img class="box-age" alt="Newborns" src="images/newborn.jpg"></a>
                    <p href="#newborn">Newborns</p>
                </li>
                <li>
                    <a href="#"><img class="box-age" alt="Infant" src="images/infant.jpeg"></a>
                    <p href="#infant">Infants</p>
                </li>
                <li>
                    <a href="#"><img class="box-age" alt="Toddler" src="images/toddler.jpg"></a>
                    <p href="#toddler">Toddlers</p>
                </li>
            </ul>
        </div>
        
        
        <!--SUBSCRIPTION MODEL--> 
        <div>
        	<ul class="subscription">
        		<h2>Choose a subscription Model</h2>
        		<div class="subscription-box">
        			<h3>Premium</h3>
        				<ul class="card">
        					<li>$550 / month</li>
        					<li>Free Home Delivery</li>
        				</ul>
        		</div>
        		<div class="subscription-box">
        			<h3>Standard</h3>
        				<ul class="card">
        					<li>$350 / month</li>
        					<li>Home Delivery within a week</li>
        				</ul>
        		</div>
        		<div class="subscription-box">
        			<h3>Premium</h3>
        				<ul class="card">
        					<li>$250 / month</li>
        					<li>Home Delivery at $15</li>
        				</ul>
        		</div>
        	</ul>
        </div>
        
        
        <!-- SUBSCRIPTION DURATION-->
         <div>
            <h2> Choose the subscription Duration</h2>
            <ul class="subscription-duration">
                <li>
                    <a href="#"><img class="duration-circle" alt="3" src="images/3.jpg"></a>
                </li>
                <li>
                    <a href="#"><img class="duration-circle" alt="6" src="images/6.jpg"></a>
                </li>
                <li>
                    <a href="#"><img class="duration-circle" alt="9" src="images/9.jpg"></a>
                </li>
                <li>
                    <a href="#"><img class="duration-circle" alt="12" src="images/12.jpg"></a>
                </li>
            </ul>
        </div>
        
       
       <!--JAVA SCRIPTS -->
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
