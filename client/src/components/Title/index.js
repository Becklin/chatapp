import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TitleStyled = styled('h1')`
  font-weight: 200;
  letter-spacing: 12px;
`
const Title = ({ children }) => 
    (<TitleStyled>{children}</TitleStyled>);


Title.propTypes = {
    children: PropTypes.element,
}

export default Title;
