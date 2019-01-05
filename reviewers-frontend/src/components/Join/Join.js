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
      margin-bottom: 15px;
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

const Join = (props) => {
  const {
    errors,
    email,
    username,
    password,
    passwordConfirm,
    onEmailChange,
    onUsernameChange,
    onPasswordChange,
    onPasswordConfirmChange,
    onJoinClick
  } = props;

  return (
    <StyledDiv>
      <CardTemplate className="join-card" headerMsg={'회원가입'}>
        <form className="join-form">
          <TextInput 
            type="email" 
            className="form-input" 
            onChange={onEmailChange} 
            value={email}
            error={errors.email}
            placeholder="이메일을 입력하세요." 
          />
          <TextInput 
            type="text" 
            className="form-input"
            onChange={onUsernameChange}
            value={username}
            error={errors.username}
            placeholder="이름을 입력하세요." 
          />
          <TextInput 
            type="password"
            className="form-input" 
            onChange={onPasswordChange}
            value={password}
            error={errors.password}
            placeholder="비밀번호를 입력하세요." 
          />
          <TextInput 
            type="password"
            className="form-input" 
            onChange={onPasswordConfirmChange} 
            value={passwordConfirm}
            placeholder="비밀번호를 다시 입력하세요."
            error={errors.passwordConfirm}
          />
          <Button type="submit" className="join-btn" onClick={onJoinClick}>회원가입</Button>
          <Link to="/login"><Button className="cancel-btn">취소</Button></Link>
        </form>
      </CardTemplate>
    </StyledDiv>
  )
}

export default Join;
