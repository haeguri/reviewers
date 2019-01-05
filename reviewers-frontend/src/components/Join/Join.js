import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CardTemplate from '../../templates/CardTemplate';
import TextInput from '../TextInput';
import Button from '../Button';

const StyledDiv = styled.div`
  padding: 50px 0;

  .join-form {
    margin: 40px 40px 100px;

    .form-input {
      height: 36px;
      margin-bottom: 10px;
    }

    .join-btn, .cancel-btn {
      width: 100%;
      height: 40px;
      font-size: 18px;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .join-btn {
      background-color: #0d4292;
      border: solid 1px #072757;
      color: #fff;
    }
  }
`;

class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    };
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  } 

  onUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  onPasswordConfirmChange = (e) => {
    this.setState({passwordConfirm: e.target.value});
  }
  
  onJoinClick = (e) => {
    const { email, username, password, passwordConfirm } = this.state;
    if(password !== passwordConfirm) {
      console.log('Please check password input.')
      return;
    }

    this.props.requestJoin({
      email, username, password
    });
  }

  render() {
    return (
      <StyledDiv>
        <CardTemplate className="join-card" headerMsg={'회원가입'}>
          <form className="join-form">
            <TextInput 
              type="email" 
              className="form-input" 
              onChange={this.onEmailChange} 
              value={this.state.email} 
              placeholder="이메일을 입력하세요." 
            />
            <TextInput 
              type="text" 
              className="form-input"
              onChange={this.onUsernameChange}
              value={this.state.username}
              placeholder="이름을 입력하세요." 
            />
            <TextInput 
              type="password"
              className="form-input" 
              onChange={this.onPasswordChange} 
              value={this.state.password} 
              placeholder="비밀번호를 입력하세요." 
            />
            <TextInput 
              type="password"
              className="form-input" 
              onChange={this.onPasswordConfirmChange} 
              value={this.state.passwordConfirm}
              placeholder="비밀번호를 다시 입력하세요."
            />
            <Button className="join-btn" onClick={this.onJoinClick}>회원가입</Button>
            <Link to="/login"><Button className="cancel-btn">취소</Button></Link>
          </form>
        </CardTemplate>
      </StyledDiv>
    )
  }
}

export default Join;
