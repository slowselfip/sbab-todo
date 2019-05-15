# SBAB-todo
Todo application made as a code assignment. The client is a single page application made with React and uses Redux for some state management. The server runs on koa and provides an api for the client to store data in mongoDB. The idea with the folder arrangement is to keep a domain directory structure. The entry point for the application is in the `src/client/index.jsx` file. This renders an App component which is React class component as required by the assignment. The rest of the application consists mostly of a TodoField (input for creating new todos) and a TodoList that contain TodoListItems. Files for managing data is in the `src/client/data` folder together with the redux store and root saga. 

## Install and start the application
To start it, install the node packages `npm i` or `yarn` and then run `npm start`. Not that a .env file is required to run the application. This file is not provided with the source code since it contains sensitive information, it's delivered by other means.

## Run the tests
Tests are run witht the `npm run test` command. There are currently three test files that covers the different test requirements of the assignment.

* Example of unit tests are in `src/client/components/todo-list-item/TodoListItem.test.jsx`.
* Example of a data driven test is in `src/client/data/todos/reducer.test.js`.
* Example of a flow driven test (if I understood that right) is in `src/client/util/saga-util.test.js`

## Styles
The assignment stated there should be at least two style files with different css "strategies". Some ordinary class selectors can be found in the `src/client/styles/main.less` folder and in the `src/client/components/todos/todo-list-item/TodoListItem.less` there are some BEM selectors. The app has been made to be usable on a mobile phone but has only been tested with the chrome dev tools "toggle device" setting.

## Some additional notes
The assignment also said to use a Promise, this can be found in the `server/todos/routes.js` file. 

I added an error-reducer which stores the latest error payload from any failure-action. This is however not used in the application but is left there anyway.

Another requirement is to maintain the order of dragged todos during a page reload. This is achieved by persisting the data to the database and that operation is debounced. If the user performs many drag + drops without delay, the saga code that handles the update will wait for 1 second of no reorder actions before commiting the change to the database. If the tester is really quick in performing a reload after a re-order has been performed, then that reordering will not have been persisted. This timeout is of cource configurable but.

There's also a "clear list"-button. Clicking this will remove all todos in the list immediately. There has not been added any warning dialog added.

Thanks for reading,
Have a great day!