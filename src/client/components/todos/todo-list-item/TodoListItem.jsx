import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TodoListItem.less';
import TodoCheckbox from '../../checkbox/TodoCheckbox';

const TodoListItem = React.memo(({ todo: { id, completed, description }, onClick, onDelete }) => {
  const handleTodoClick = useCallback(() => onClick(id, completed), [id, completed, onClick]);
  const handleRemoveClick = useCallback(
    event => {
      event.stopPropagation();
      onDelete(id);
    },
    [id, onDelete]
  );
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        className={cx('todo', { 'todo--completed': completed })}
        onClick={handleTodoClick}
      >
        <div className="todo__checkbox-wrapper">
          <TodoCheckbox className="todo__checkbox" id={id} checked={completed} />
        </div>
        <div className="todo__description">{description}</div>
        <div className="todo__actions">
          <FontAwesomeIcon
            role="button"
            className="todo__action-icon"
            icon="trash"
            onClick={handleRemoveClick}
          />
        </div>
      </div>
    </li>
  );
});

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    completed: PropTypes.bool,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
};

TodoListItem.defaultProps = {
  onClick: undefined,
  onDelete: undefined
};

export default TodoListItem;
