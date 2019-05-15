import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TodoCheckbox.less';

const TodoCheckbox = React.memo(({ id, className, checked }) => (
  <label htmlFor={id}>
    <input
      id={id}
      className={cx('todo-checkbox', className)}
      type="checkbox"
      checked={checked}
      readOnly
    />
  </label>
));

TodoCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool
};

TodoCheckbox.defaultProps = {
  checked: false,
  className: undefined
};

export default TodoCheckbox;
