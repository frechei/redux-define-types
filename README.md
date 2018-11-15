# How do you define redux types in traditional way?
### First way:
```js
// Group 1
export const FETCH_DATA = 'fetch data prepare';
export const FETCH_DATA_SUCCESS = 'fetch data success';
export const FETCH_DATA_FAIL = 'fetch data fail';

// Group 2
export const CREATE_DATA = 'create data prepare';
export const CREATE_DATA_SUCCESS = 'create data success';
export const CREATE_DATA_FAIL = 'create data fail';

// Group 3
export const SET_LOCAL_CLOCK = 'set local clock';

// Group 4
export const SET_LOCAL_STORAGE = 'set local storage';
```
### Second way:
```js
// Group 1
export const FETCH_DATA = {
  prepare: 'fetch data prepare',
  success: 'fetch data success',
  fail: 'fetch data fail',
};

// Group 2
export const CREATE_DATA = {
  prepare: 'create data prepare',
  success: 'create data success',
  fail: 'create data fail',
};

// Group 3
export const SET_LOCAL_CLOCK = 'set local clock';

// Group 4
export const SET_LOCAL_STORAGE = 'set local storage';
```

----------------

But what I say: `It's wasting life.` 
<br>
Exactly, you just repeat your defination every time. The work will make you boring and no sense.

# How do I define redux types in modern way?
```js
import { ACTION_TYPES, ACTION_SINGLE_TYPE } from 'redux-define-types';

// Group 1
export const FETCH_DATA = ACTION_TYPES;

// Group 2
export const CREATE_DATA = ACTION_TYPES;

// Group 3
export const SET_LOCAL_CLOCK = ACTION_SINGLE_TYPE;

// Group 4
export const SET_LOCAL_STORAGE = ACTION_SINGLE_TYPE;
```
Cool, so easy. No repeat any more, and the IDE can track your variable easily.
```js
export function dataReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_DATA.prepare:
      // Update your state here.
    case FETCH_DATA.success:
      // Update your state here.
    case FETCH_DATA.fail:
      // Update your state here.
    case SET_LOCAL_CLOCK:
      // Update your state here.
    default:
      return state;
  }
}
```

# Installation
```bash
yarn add redux-define-types

// Or

npm install redux-define-types
```

# Do not forget to add babel plugin.
```json
// .babelrc

{
  "plugins": [
    "redux-define-types/babel"
  ]
}
```
