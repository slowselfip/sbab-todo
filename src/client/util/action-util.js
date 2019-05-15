/* eslint import/prefer-default-export: 0 */

function createAction(type, payload) {
  return { type, payload };
}

export { createAction };
