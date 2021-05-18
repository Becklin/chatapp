import React from 'react';
import AuthService from '../../util/auth';

import { Person, PersonPlus, FilePlus } from 'react-bootstrap-icons';
import LinkWithIcon from '../LinkWithIcon';
import styled from '@emotion/styled';

const HomeStyled = styled('div')`
  display: flex;
  background: radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 100%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Home = () => (
    <HomeStyled>
      <h1>Fresh Talk</h1>
      <div className="chat-home__controls">
        <LinkWithIcon primary width="120px" to="/join" icon={<FilePlus size="24" />} >Sign up</LinkWithIcon>
        {AuthService.getCurrentUser() ? (
          <LinkWithIcon primary width="120px" to="/join" icon={<PersonPlus size="24" />} >Join</LinkWithIcon>
        ) : (
          <LinkWithIcon primary width="120px" to="/login" icon={<Person size="24" />} >Login</LinkWithIcon>
        )}
      </div>
    </HomeStyled>
);

export default Home;
