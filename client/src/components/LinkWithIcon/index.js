import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const primaryStyle = () =>
  css`
    padding: 16px;
    background: #007bff;
    border-radius: 5px;
    margin: 8px;
    color: #ffffff;
    display: inline-block;
  `

const StyledLink = styled(Link)`
    &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
      color: #2A3346,
      display: flex;
      justify-content: center;
      ${props => props.primary && primaryStyle};
      & > svg {
        margin: 0 8px;
      }
  }
`;

const LinkWithIcon = ({ to, icon, width, children, disabled, primary }) => 
    (<StyledLink width={width} to={to} disabled={disabled} primary={primary && primary.toString()}>{icon}{children}</StyledLink>);

LinkWithIcon.defaultProps = {
  icon: null,
}

LinkWithIcon.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.element,
  width: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
}

export default LinkWithIcon;
