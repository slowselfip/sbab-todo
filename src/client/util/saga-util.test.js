import { call, put } from 'redux-saga/effects';
import { apiRequest } from './saga-util';
import { createAction } from './action-util';

const testData = { foo: 'bar', baz: 'qux' };

const successAction = {
  type: 'TEST_SUCCESS_ACTION'
};

const failureAction = {
  type: 'TEST_FAILURE_ACTION'
};

const payload = {
  ids: [1, 2, 3]
};

describe('apiRequest in saga util', () => {
  it('calls the provided endpoint and put a successAcction if response has status 200', async () => {
    const niceMockEndpoint = jest.fn(() => Promise.resolve({ status: 200, data: testData }));
    const gen = apiRequest(niceMockEndpoint, successAction, failureAction, payload);
    expect(gen.next().value).toEqual(call(niceMockEndpoint, payload));
    const result = await niceMockEndpoint();
    expect(gen.next(result).value).toEqual(put(createAction(successAction, result.data)));
  });
  it('calls the provided endpoint and put a failureAction if response has some other status', async () => {
    const error = new Error('Test error');
    const evilMockEndpoint = jest.fn(() => Promise.resolve({ status: 400, error }));
    const gen = apiRequest(evilMockEndpoint, successAction, failureAction, payload);
    gen.next();
    const result = await evilMockEndpoint();
    expect(gen.next(result).value).toEqual(put(createAction(failureAction, error)));
  });
});
