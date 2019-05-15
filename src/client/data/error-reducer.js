export const RESET_ERROR_MESSAGE = 'REST_ERROR_MESSAGE';

export default function errorReducer(state = null, action = {}) {
  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  }

  if (error) {
    return error;
  }

  return state;
}
