# redux-define-types
Define redux types in more easy way.

## How to define types in traditional way?
### First:
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
### Second:
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
Exactly, you just repeat your defination every time. The work will make you crazy.

## How to define in modern way?
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
## Support

<table>
    <tr>
      <td>Babel 6</td>
      <td>1.x</td>
      <td>yarn add redux-define-types@1.0</td>
    </tr>
    <tr>
      <td>Babel 7</td>
      <td>Current</td>
      <td>yarn add redux-define-types</td>
    </tr>
</table>

`npm` is also supported.
## Do not forget to add babel plugin
```json
{
  "plugins": [
    "redux-define-types/babel"
  ]
}
```
## Options

#### filePartner (optional)
Including the path where you define types. It can make babel transform faster.

```json
{
  "plugins": [
    ["redux-define-types/babel", {"filePartner": "types-.*?\.js"}]
  ]
}
```

#### fileString (optional)
Including the path where you define types. It can make babel transform faster.

It can be filename like: **"actionTypes.js"**
<br>
Or a folder like: **"/action-types/"**

```json
{
  "plugins": [
    ["redux-define-types/babel", {"fileString": "/action-types/"}]
  ]
}
```

## Tests
1. Clone this repository.
<br>
2. Run `yarn install`
<br>
3. Run `yarn run test`, and look at the file **demo/transform.js**
