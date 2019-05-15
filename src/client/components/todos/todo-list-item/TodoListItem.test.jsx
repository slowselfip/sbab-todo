import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import TodoListItem from './TodoListItem';

library.add(faTrash);

const todo = {
  id: '5cdb2989f7a1683bca97aa02',
  completed: false,
  description: 'Mock todo',
  createdAt: '2019-05-14T20:48:09.189Z',
  updatedAt: '2019-05-14T20:48:09.189Z'
};

afterEach(cleanup);

describe('TodoListItem', () => {
  it('renders', () => {
    const { asFragment } = render(<TodoListItem todo={todo} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Call the onClick callback when clicked', () => {
    const onClickSpy = jest.fn();
    const { container } = render(<TodoListItem todo={todo} onClick={onClickSpy} />);
    const todoItem = container.querySelector(`div[role="button"]`);
    fireEvent.click(todoItem);

    expect(onClickSpy).toHaveBeenCalledWith(todo.id, todo.completed);
  });

  it('Call the onDelete callback when clicking on the trashcan', () => {
    const onDeleteSpy = jest.fn();
    const { container } = render(<TodoListItem todo={todo} onDelete={onDeleteSpy} />);
    const trashcan = container.querySelector(`.todo__action-icon[role="button"]`);
    fireEvent.click(trashcan);

    expect(onDeleteSpy).toBeCalledWith(todo.id);
  });
});
