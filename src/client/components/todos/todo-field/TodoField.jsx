import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TodoField.less';

const TodoField = React.forwardRef(
  ({ className, placeholder, onChange, onKeyDown, value }, ref) => (
    <input
      ref={ref}
      className={cx(className, 'todo-field')}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
);

TodoField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string
};

TodoField.defaultProps = {
  className: undefined,
  placeholder: undefined,
  onChange: undefined,
  onKeyDown: undefined,
  value: undefined
};

export default TodoField;
