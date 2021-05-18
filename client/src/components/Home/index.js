import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../util/auth';
import './index.scss';

import styled from '@emotion/styled';
const BgGradient = styled('div')`
  background: radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 100%);
`;
const StyledLink = styled(Link)`
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        padding: 16px;
        background: #007bff;
        border-radius: 10px;
        color: #ffffff;
        margin: 8px;
        display: flex;
        justify-content: center;
        width: ${props => props.width};
    }
`;
const Home = () => (
  <BgGradient>
    <div className="chat-home">
      <h1>Fresh Talk</h1>
      <div className="chat-home__controls">
        <StyledLink width="90%" to="/signup">Sign up</StyledLink>
        {AuthService.getCurrentUser() ? (
          <StyledLink width="90%" to="/join">Join</StyledLink>
        ) : (
          <StyledLink width="90%" to="/login">Login</StyledLink>
        )}
      </div>
    </div>
  </BgGradient>
);

export default Home;
