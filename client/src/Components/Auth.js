import React, { Component } from 'react';
import GoogleButton from 'react-google-button'
import TwitterLogin from "react-twitter-login";

class Auth extends Component {
 


  render() {
    return (
      <div className="container">
      
         <div style={{ marginTop: "4rem" }} className="row">

          <div className="col s8 offset-s2">
          <h1 style={{fontSize:45,fontFamily:"Roboto"}}>Twitter Sentiment Visualizer</h1>
      <div className="container">
      <div align="center">
      <a href="http://localhost:5000/auth/google">
      <GoogleButton
      type="dark" // can be light or dark
 
    />
   </a>  
      </div>
      
      </div>
     <div className="container">OR</div>
      <div className="container">
      <div align="center">
      <a href="http://localhost:5000/auth/twitter">
     <TwitterLogin
      buttonTheme="dark"
    />
    </a>
      </div>
      </div>
          </div>  
          </div>
      </div>
    );
  }
}

export default Auth;

