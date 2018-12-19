import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate';
import CardTemplate from '../../templates/CardTemplate';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import styled from 'styled-components';

const StyledPageTemplate = styled(PageTemplate)`
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
      email: 'testn@test.com',
      username: 'testn',
      password: 'qwer1234',
      passwordConfirm: 'qwer1234'
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
      <StyledPageTemplate width={500}>
        <CardTemplate 
          className="join-card"
          headerMsg={'회원가입'}
        >
          <form className="join-form">
            <TextInput className="form-input" onChange={this.onEmailChange} value={this.state.email} type="email" placeholder="이메일을 입력하세요." />
            <TextInput className="form-input" onChange={this.onUsernameChange} value={this.state.username} type="text" placeholder="이름을 입력하세요." />
            <TextInput className="form-input" onChange={this.onPasswordChange} value={this.state.password} type="password" placeholder="비밀번호를 입력하세요." />
            <TextInput className="form-input" onChange={this.onPasswordConfirmChange} value={this.state.passwordConfirm} type="password" placeholder="비밀번호를 다시 입력하세요." />
            <Button type="button" onClick={this.onJoinClick} className="join-btn filled">회원가입</Button>
            <Link to="/login"><Button className="cancel-btn">취소</Button></Link>
          </form>
        </CardTemplate>
      </StyledPageTemplate>
    )
  }
}

export default Join;
