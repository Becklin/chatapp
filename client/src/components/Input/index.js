import React from 'react';

import './index.scss';

const Input = ({message, setMessage, sendMessage}) => (
    <form className="form">
        <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? setMessage(event):null}
        />
        <button onClick={(event) => sendMessage(event)}>send</button>
    </form>
);

export default Input;