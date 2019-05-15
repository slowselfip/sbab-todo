import reducer, { TODO_FETCH_SUCCESS } from './reducer';

const todos = [
  { id: 1, description: 'foo', completed: false },
  { id: 2, description: 'bar', completed: false },
  { id: 3, description: 'baz', completed: false }
];

describe('todo reducer', () => {
  test.each`
    input                                          | stateSize | todoState                                    | orderState
    ${{ todos: [todos[0]], order: [1] }}           | ${1}      | ${{ 1: todos[0] }}                           | ${[1]}
    ${{ todos: todos.slice(1, 3), order: [2, 3] }} | ${2}      | ${{ 2: todos[1], 3: todos[2] }}              | ${[2, 3]}
    ${{ todos, order: [3, 1, 2] }}                 | ${3}      | ${{ 1: todos[0], 2: todos[1], 3: todos[2] }} | ${[3, 1, 2]}
  `(
    ' Successful fetching of $input produces state of size $stateSize with byId-state $todoState and all-state $orderState',
    ({ input, stateSize, todoState, orderState }) => {
      const { byId, all } = reducer({}, { type: TODO_FETCH_SUCCESS, payload: input });
      expect(all.length).toEqual(stateSize);
      expect(byId).toMatchObject(todoState);
      expect(all).toEqual(orderState);
    }
  );
});
