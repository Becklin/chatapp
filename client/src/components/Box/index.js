import React from 'react';
// import PropTypes from 'prop-types';
// import { Toast } from 'react-bootstrap';
// import { Portal } from 'react-portal';
import './index.scss';
// import useMediaQuery from '../../util/useMediaQuery';

const Box = ({
  title,
  content,
  control
  // setHasNotification,
  // hasNotification,
  // notificationContent
}) => {
  // const mediaQuery = useMediaQuery();
  // const portalDom = (
  //   <Portal node={document && document.getElementById('portal')}>
  //     <Toast delay={3000} autohide>
  //       <Toast.Header>
  //         <strong className="mr-auto">FAILURE</strong>
  //       </Toast.Header>
  //       <Toast.Body>{notificationContent}</Toast.Body>
  //     </Toast>
  //   </Portal>
  // );
  return (
    <div className="chat__box">
      <h1>{title}</h1>
      {content}
      <div>{control}</div>
      {/* {hasNotification && portalDom} */}
    </div>
  );
};

Box.defaultProps = {
  setHasNotification: () => {},
  hasNotification: false
};

export default Box;
