import React, { PropTypes } from 'react';
import { Message } from 'semantic-ui-react';
import { I18n } from 'react-i18nify';
import './style.scss';

const Notificator = ({ message }) => message && message.isShown && (
  <Message
    className="notificator"
    success={message.type === 'success'}
    error={message.type === 'error'}
    header={I18n.t(message.title)}
    content={I18n.t(message.text)}
  />
);

Notificator.propTypes = {
  message: PropTypes.object,
};

export default Notificator;
