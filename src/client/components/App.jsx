import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TodoField from './todos/todo-field/TodoField';

import {
  createTodo,
  fetchTodos,
  updateTodo,
  getTodos,
  deleteTodos,
  swapTodosAndSaveOrder,
  deleteAllTodos
} from '../data/todos/reducer';
import { TodoList } from './todos';
import ThemeButton from './theme-button/ThemeButton';

class App extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({})),
    dispatch: PropTypes.func
  };

  static defaultProps = {
    todos: [],
    dispatch: undefined
  };

  state = {
    description: '',
    theme: localStorage.getItem('sbab-todo-theme') || 'light'
  };

  inputRef = React.createRef();

  componentDidMount() {
    const { dispatch } = this.props;
    const { theme } = this.state;
    dispatch(fetchTodos());
    document.body.classList.add(theme);
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  componentDidUpdate(_, prevState) {
    const { theme } = this.state;
    if (prevState.theme !== theme) {
      document.body.classList.replace(theme === 'dark' ? 'light' : 'dark', theme);
      localStorage.setItem('sbab-todo-theme', theme);
    }
  }

  handleDescriptionChange = event => {
    if (event && event.target) {
      this.setState({
        description: event.target.value
      });
    }
  };

  handleTodoKeyDown = ({ key } = {}) => {
    const { dispatch } = this.props;
    const { description } = this.state;

    if (key === 'Enter') {
      dispatch(createTodo({ description }));
    }

    if (key === 'Escape' || key === 'Enter') {
      this.setState({
        description: ''
      });
    }
  };

  handleTodoClick = (id, completed) => {
    const { dispatch } = this.props;
    dispatch(updateTodo({ id, completed: !completed }));
  };

  handleTodoDelete = id => {
    const { dispatch } = this.props;
    dispatch(deleteTodos(id));
  };

  handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    const { dispatch } = this.props;

    dispatch(
      swapTodosAndSaveOrder({ sourceIndex: source.index, destinationIndex: destination.index })
    );
  };

  handleDeleteAll = () => {
    const { dispatch } = this.props;
    dispatch(deleteAllTodos());
  };

  handleThemeButtonClick = () => {
    this.setState(oldState => ({
      ...oldState,
      theme: oldState.theme === 'light' ? 'dark' : 'light'
    }));
  };

  render() {
    const { description, theme } = this.state;
    const { todos } = this.props;
    return (
      <main>
        <section className="heading">
          <h1>TODO</h1>
          <ThemeButton theme={theme} onClick={this.handleThemeButtonClick} />
          <button type="button" onClick={this.handleDeleteAll}>
            <FontAwesomeIcon icon="trash" /> All
          </button>
        </section>
        <section className="todos">
          <TodoField
            ref={this.inputRef}
            placeholder="Add something to do..."
            value={description}
            onChange={this.handleDescriptionChange}
            onKeyDown={this.handleTodoKeyDown}
          />
        </section>
        <section className="todo-section">
          <TodoList
            todos={todos}
            onTodoClick={this.handleTodoClick}
            onTodoDelete={this.handleTodoDelete}
            onDragEnd={this.handleDragEnd}
          />
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  todos: getTodos(state)
});

export default compose(
  hot,
  connect(mapStateToProps)
)(App);
