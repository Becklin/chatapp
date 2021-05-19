import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Title } from '../../components';
// import { css } from '@emotion/react';

const BoxStyle = styled('div')`
  width: 300px;
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ControlStyled = styled('div')`
  margin: 12px 0px;
`
// const Child = styled('span')`
//   color: blue;
// `
// const Button = styled.button`
//   color: ${props =>
//     props.primary ? 'hotpink' : 'turquoise'};
//     ${Child} {
//       color: yellow;
//     }
// `
// const AnotherSpan = Button.withComponent('span');
// const dynamicStyle = props =>
//   css`
//     color: ${props.color};
//   `
//   const Example = styled('span')`
//   color: lightgreen;
//   & > a {
//     color: hotpink;
//   }
//`

// const Container = styled.div`
//   ${dynamicStyle};
// `
const Box = ({ title, content, control, notification }) => {
  return (
    <BoxStyle
    className="chat__box"
    >
        {/* <Example>
    This is <a>nested</a>.
  </Example> */}
      {/* <Button
        as="a"
        href="https://github.com/emotion-js/emotion"
      >
        Emotion on GitHub
      </Button>
      <Container color="lightgreen">
        This is lightgreen.
      </Container>
      <H1>febfhtjffnfyukfukyf</H1>
      <Button primary>ddd<Child>child</Child></Button>
      <AnotherSpan>heyhehyehy</AnotherSpan> */}
      <div>{notification.content}</div>
      <Title>{title}</Title>
      {content}
      <ControlStyled>{control}</ControlStyled>
    </BoxStyle>
  );
};
// const H1 = styled('h1')(() => ({
//   color: 'yellow'
// }))

Box.defaultProps = {
  notification: {
    content: "",
    type: null,
  }
};

Box.propTypes = {
  title: PropTypes.string,
  content: PropTypes.func,
  control: PropTypes.element,
  notification: PropTypes.object,
};

export default Box;
