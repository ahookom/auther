import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {validateCredentials} from '../redux/session.js';
import store from '../store';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
  }

  handleEmailChange(e){
    this.setState({email:e.target.value});
  }

  handlePWChange(e){
    this.setState({password:e.target.value});
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        {this.props.attemptFailed ? <div className = "alert">Please enter valid credentials</div> : null};
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                onChange={(e)=>{this.handleEmailChange(e)}}
                value={this.state.email}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  onChange={(e)=>{this.handlePWChange(e)}}
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  required
                />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    // post to the login route
    // redirect if successful, or return to login if unsuccessful

    console.log(event);
    const { message } = this.props;
    event.preventDefault();
    console.log("state and validate", this.state, validateCredentials);
    this.props.validateCredentials(this.state);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state, ownProps) => ({ message: 'Log in', attemptFailed: state.session.attemptFailed });
const mapDispatch = (dispatch, ownProps) => ({
  validateCredentials: (obj)=>dispatch(validateCredentials(obj))
});

export default connect(mapState, mapDispatch)(Login);
