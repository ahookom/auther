import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signUpUser } from '../redux/session';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
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
        {this.props.attemptFailed ? <div className = "alert">You already exist! Or maybe something</div> : null};
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={(e)=>{this.handleEmailChange(e)}}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                value={this.state.password}
                className="form-control"
                onChange={(e)=>{this.handlePWChange(e)}}
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

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.signUpUser(this.state);
    console.log(`almost 6:30`);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });
const mapDispatch = (dispatch, ownProps) => ({
  signUpUser: (obj)=>dispatch(signUpUser(obj))
});

export default connect(mapState, mapDispatch)(Signup);
