import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import LinkWithIcon from '../LinkWithIcon';
import { vars }  from "../../variables";
import styled from "@emotion/styled";

const InfoBarStyled = styled('div')`
      display: flex;
      align-items: center;
      padding: 0 50px 0 12px;
      & .chat__room {
        width: 100px;
        flex: 5;
        color: ${vars.MainFontColor};
      }
      & .chat__count {
        width: 100px;
        flex: 1;
        color: ${vars.MainFontColor};
      }
      & .chat__back {
        width: 100px;
        flex: 1;
      }
`

const InfoBar = ({ room, counts }) => (
  <InfoBarStyled>
    <div className="chat__room">
      <h3>{room}</h3>
    </div>
    <div className="chat__count">
      {counts} <PeopleFill color={vars.MainFontColor} size={24} />
    </div>
    <div className="chat__back">
      <LinkWithIcon
            to='/'
            icon={<ArrowLeftCircle color={vars.MainFontColor} size={24} />}
      />
    </div>
  </InfoBarStyled>
);

InfoBar.propTypes = {
  room: PropTypes.string,
  counts: PropTypes.number,
}

export default React.memo(InfoBar);
