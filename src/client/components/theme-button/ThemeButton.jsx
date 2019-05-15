import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ThemeButton.less';

const ThemeButton = ({ theme, onClick }) => (
  <div role="button" tabIndex={0} className="theme-button" onClick={onClick}>
    {theme === 'light' ? (
      <FontAwesomeIcon icon={['far', 'lightbulb']} />
    ) : (
      <FontAwesomeIcon icon="lightbulb" />
    )}
  </div>
);

ThemeButton.propTypes = {
  theme: PropTypes.string,
  onClick: PropTypes.func
};

ThemeButton.defaultProps = {
  theme: 'light',
  onClick: undefined
};

export default ThemeButton;
