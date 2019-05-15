import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoListItem from '../todo-list-item/TodoListItem';
import './TodoList.less';

const TodoList = React.memo(({ todos, onTodoClick, onTodoDelete, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="todo-list">
      {droppable => (
        <div {...droppable.droppableProps} ref={droppable.innerRef}>
          <ul className="todo-list">
            {todos && todos.length
              ? todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {draggable => (
                      <div
                        className="todo-drag-container"
                        ref={draggable.innerRef}
                        {...draggable.draggableProps}
                        {...draggable.dragHandleProps}
                      >
                        <TodoListItem todo={todo} onClick={onTodoClick} onDelete={onTodoDelete} />
                      </div>
                    )}
                  </Draggable>
                ))
              : null}
            {droppable.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  </DragDropContext>
));

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      description: PropTypes.string,
      id: PropTypes.string
    })
  ),
  onTodoClick: PropTypes.func,
  onTodoDelete: PropTypes.func,
  onDragEnd: PropTypes.func
};

TodoList.defaultProps = {
  todos: undefined,
  onTodoClick: undefined,
  onTodoDelete: undefined,
  onDragEnd: undefined
};

export default TodoList;
