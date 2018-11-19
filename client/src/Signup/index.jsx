import React, { Component } from 'react';

class Signup extends Component {
	constructor(props) {
		super(props);

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      password2: ''
    };

    this.submit = this.submit.bind(this);
    this.setInput = this.setInput.bind(this);
    this.checkExist = this.checkExist.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
	}

  /**
   *sets value from input to state
   *
   **/
  setInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   *sends request to backend to check if a certain value exists
  **/
  checkExist() {
    console.log('hey');
  }

  /**
   *check if passwords match 
  **/
  checkMatch() {
    const { password,password2 } = this.state;
    if (password!==password2) {
      alert('passwords do not match');
    }
  }

  /**
   *validates email 
  **/
  validateEmail() {

  }

  /**
   *submit form data
  **/
  submit(e) {
    e.preventDefault();
    let sub = true;
    for(let i of Object.keys(this.state)) {
      if (this.state[i] === '') {
        sub = false;
      }
    }
    if (sub === false) {
      alert('Fields Cannot Be Left Empty');
    }else{
      alert('Registered successfully');
    }

  }

  render() {
    return(
      <div className="container">
        <div className="content lighten-3">
          <div>
            <div className="header">

            </div>
          </div>
          <form className="container">
            <input 
              name="firstName"
              type="text" 
              onChange={this.setInput} 
              placeholder="First Name"
            />  
            <input 
              name="lastName"
              type="text" 
              onChange={this.setInput} 
              placeholder="Last Name" 
            />  
            <input 
              name="userName"
              type="text" 
              onChange={this.setInput}
              onBlur={this.checkExist} 
              placeholder="Username"
            />  
            <input 
              name="email"
              type="email" 
              onChange={this.setInput}
              onBlur={this.checkExist} 
              placeholder="Email" 
            />  
            <input 
              name="password"
              type="Password" 
              onChange={this.setInput} 
              placeholder="Password" 
            />  
            <input 
              name="password2"
              type="Password" 
              onChange={this.setInput}
              onBlur={this.checkMatch} 
              placeholder="Confirm Password" 
            /> 
            <input
             type="checkbox" 
            /> 
           <input
             type="submit"
             id="submit"
             value="submit"
             onClick={this.submit}
             className="btn btn-submit btn-medium effect waves-effect green right" 
            />
          </form>
        </div>
      </div>   

      )
  }

}
export default  Signup;