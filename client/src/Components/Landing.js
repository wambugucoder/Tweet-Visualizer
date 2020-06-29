import React, { Component } from 'react';

import CanvasJSReact from "../Assets/canvasjs.react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData,getUser } from '../other/actions/Action';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
         query: "",
         
        };
      }
    componentDidMount(){
      this.props.getUser();
    }
      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit =(e)  => {
      
    e.preventDefault();
    const queryData = {
        q: this.state.query,
       
      };
     
    this.props.getData(queryData);
      };
      renderChart = () => {
        const{twitter}=this.props.twitter;
       var score={"Very_Negative":0,"negative":0,"neutral":0,"positive":0,"Very_Positive":0}
   
    
    twitter.map((twitter) =>
   
    score={"Very_Negative":twitter.Very_negative,"Negative":twitter.negative,"Neutral":twitter.neutral,"Positive":twitter.positive,"Very_Positive":twitter.Very_positive}
    
    
    
    )
     
 
      
   
    
    
        
        
        const options = {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Live tweet Visualization"
          },
          axisY: {
            title: "Number of tweets",
            includeZero: false,
          },
          axisX: {
            title: "Tweet Severity",
            includeZero: false,
            
          },
          data: [
          {
            type: "splineArea",
            showInLegend: true,
            dataPoints: [
             
              { label: "Very Negative", y:(score["Very_Negative"])},
              { label: "Negative", y: (score["Negative"])},
              { label: "Neutral", y:(score["Neutral"])},
              { label: "Positive", y: (score["Positive"])},
              { label: "Very Positive", y:(score["Very_Positive"])}
             
            ]
          }
          ]
          
        }
    
        if (this.props.twitter.isRetrieved) {
          return (
            <div className="row">
            {console.log(score)}
            <CanvasJSChart options = {options}
              /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
                     );
        }
        return (
          <p>
          GRAPHS WILL BE PLOTTED HERE
          </p>
        );
       
      };
      renderTable = () => {
        const {twitter}=this.props.twitter;
        if (this.props.twitter.isRetrieved) {
          return (
            <div class="center">
            <table class="responsive-table">
           
            <thead>
           
           <tr>
           
           <th >Tweet</th>
           <th >Score</th>
           <th >Sentiment</th>
           
           
           </tr>
           
            </thead>
            <tbody>
              {
               twitter.map((twitter)=>
               <tr key={twitter.id}>
                 <td>{twitter.tweet}</td>
                 <td>{twitter.score}</td>
                 <td>{twitter.sentiment}</td>
                
               </tr>
               
               )}
           
              
            </tbody>
            </table>
           </div>
          
      
       
          );
        }
        return (
          <p>
            ALL TWEETS WILL BE DISPLAYED HERE
          </p>
        );
      };
      renderLoader=() => {
      if (this.props.twitter.isLoading){
      return(
        <div class="preloader-background">
<div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  <p class="blinking">Fetching Tweets...</p>
</div>
      )
      } else {
       return(
         <div></div>
       )
      }
      };
  render() {
    const {user} =this.props.auth;
    return (
      <div className="wrapper">
      
<h1 style={{fontSize:60,fontFamily:"Roboto"}}>Twitter Sentiment Visualizer</h1>
<p style={{fontSize:20,fontFamily:"Roboto"}}>Hey There ,{user.name}</p>
<p style={{fontSize:20,fontFamily:"Roboto"}}>Type in Any HashTag or Keyword and Click on the Submit Button to visualize your <a href="https://twitter.com/">Twitter</a> Data</p>
<p style={{fontSize:20,fontFamily:"Roboto"}}>To get this project just Fork the repo on my <a href="https://github.com/wambugucoder/Tweet-Visualization">Github</a> Page</p>
<div class="container">
<form noValidate onSubmit={this.onSubmit}>
      <div class="row">
      
        <div class="input-field col s12">
        
       
       
        <i class="material-icons prefix">#</i>
      <input style={{fontSize:35,fontFamily:"Times New Roman"}}
               
                  id="query"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.query}
                 placeholder ="Enter your hashtag"
                />
          <label for="textarea1">Text</label>
        </div>
      </div>
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                 Submit
                </button>
              </div>
    </form>
  </div>
  <div className="container">
    {this.renderChart()}
  </div>
  <div className="container">
    {this.renderTable()}
  </div>
  <div className="container">
  {this.renderLoader()}
  </div>
      </div>
    );
  }
}
Landing.propTypes={
    getData:PropTypes.func.isRequired,
    twitter:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
   
};

const mapStateToProps = state => ({
  twitter:state.twitter,
  errors:state.errors,
  auth:state.auth,
});
export default connect(mapStateToProps,
     {getData,getUser})
     (Landing)

