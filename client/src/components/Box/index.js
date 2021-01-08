import React from 'react';
// import PropTypes from 'prop-types';
import './index.scss';
// import useMediaQuery from '../../util/useMediaQuery';

const Box = ({ title, content, control }) => {
  return (
    <div className="chat__box">
      <h1>{title}</h1>
      {content}
      <div>{control}</div>
    </div>
  );
};

export default Box;
