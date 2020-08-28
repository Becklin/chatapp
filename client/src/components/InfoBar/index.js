import React from 'react';

import './index.scss';

const InfoBar = ({room}) => (
    <div className="infoBar">
        <h3>{room}</h3>
        <div className="rightInnerContainer">
            <a href="/">x</a>
        </div>
    </div>
);

export default InfoBar;