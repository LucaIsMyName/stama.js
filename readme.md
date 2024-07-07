# stama.js

stama is a simple yet powerful state management library for JavaScript applications, designed with flexibility and ease of integration in mind. It provides essential state management functionalities along with advanced features like undo/redo capability.


## Features
- Basic State Management: Set and get state values.
- Persistence: Optionally persist state to local storage.
- URL Integration: Sync state with URL query parameters for easy bookmarking and sharing.
- Middleware Support: Add middleware functions to intercept state changes.
- Undo/Redo: Navigate through previous states of the application.

## Installation
You can install stama via npm or yarn:

```bash
npm install stama
# or
yarn add stama

```

## Usage

### Basic Usage
```js
import stama from 'stama';

// Set initial state
stama.set('counter', 0);

// Subscribe to state changes
stama.subscribe('counter', (value) => {
  console.log('Counter changed:', value);
});

// Update state
stama.set('counter', 1);

```

### URL Integration

```js
// Sync state with URL parameters
stama.syncStateWithUrl(['counter']);

// Initialize state from URL on page load
stama.initFromUrl(['counter']);

// Update state and URL parameter
stama.setUrlParam('counter', 2);

```

### Undo/Redo

```js
// Perform state changes
stama.set('counter', 3);
stama.set('counter', 4);

// Undo the last state change
stama.undo(); // counter will revert to 3

// Redo the undone state change
stama.redo(); // counter will revert to 4

```

### Middleware

```js
// Add middleware to intercept state changes
stama.use((key, value) => {
  console.log(`State change intercepted: ${key} = ${value}`);
});

```

### Persistance

```js
// Enable persistence to local storage
stama.setPersist(true);

// Save current state to local storage
stama.saveToLocalStorage();

// Load state from local storage
stama.loadFromLocalStorage();

```

## API


```js
/**
 * @param {string} key
*/
stama.get(key)
```
Get the current value of a state by key.

```js
/**
 * @param {string} key
 * @param {any} value
*/
stama.set(key, value)
```
Set the value of a state and notify listeners.

```js
/**
 * @param {Array<string>} keys
 * @param {any} value
*/
stama.setMany(keys, value)
```
Set the values of a state and notify listeners.


```js
/**
 * @param {Object} newState
 * */
stama.merge(newState)
```
Merge the existing and the new State Object together

```js
/**
 * @param {string} key
 * @param {Function} callback
*/
stama.subscribe(key, callback)
```
Subscribe to changes of a specific state key.

```js
/**
 * @param {Array<string>} keys
 * @param {Function} callback
*/
stama.subscribeMany(key, callback)
```
Subscribe to changes of a specific state keys (1 or more).

```js
/**
 * @param {string} key
 * @param {Function} callback
*/
stama.unsubscribe(key, callback)
```
Unsubscribe from changes of a specific state key.

```js
/**
 * @param {Array<string>} keys
 * @param {Function} callback
*/
stama.unsubscribeAll(keys, callback)
```
Unsubscribe from changes of a specific state keys.

```js
/**
 * @param {string} key
 * @param {Function} callback
*/
stama.listen(key)
```
Listen to any changes in a key and render a `<span>` element with id placeholderId and the value (For `element.innerHtml` only)

```js
/**
 * @param {Array<string>} keys
*/
stama.syncStateWithUrl(keys)
```
Synchronize specified state keys with URL query parameters.

```js
/**
 * @param {Array<string>} keys
*/
stama.initFromUrl(keys)
```
Initialize state from URL query parameters on page load.

```js
/**
 * @param {string} key
 * @param {any} value
*/
stama.setUrlParam(key, value)
```
Set a state value in the URL as a query parameter.

```js
/**
 * @param {string} key
*/
stama.getUrlParam(key)
```
Get a state value from the URL query parameters.

```js
stama.undo()
```
Undo the last state change globally.

```js
/**
 * @param {string} key
 * */
stama.remove(key)
```
Remove the state key/value globally.

```js
stama.redo()
```
Redo the last undone state change globally.

```js
/**
 * @param {Function} middleware
*/
stama.use(middleware)
```
Add a middleware function to intercept state changes.


```js
/**
 * @param {string} key
 * @param {any} value
 * @note should not be used directly, it's an internal method, but in edge case can be accessed if needed
*/
stama.runMiddlewares(key, value)
```
run Middleware Functions

```js
/**
 * @param {boolean} enable
*/
stama.setPersist(enable)
```
Enable or disable state persistence.

```js
stama.setToLocalStorage()
```
Save the current state to local storage.

```js
/**
 * @param {string} itemName the name of the local storage item
 * */
stama.setPartToLocalStorage(itemName)
```
Save parts of the current state to local storage.

```js
stama.getFromLocalStorage()
```
Load the state from local storage.

```js
/**
 * @param {string} itemName the name of the local storage item
 * */
stama.getPartFromLocalStorage(itemName)
```
Load parts of the state from local storage.

```js
stama.clear()
```
Clear all state keys and values.

```js
stama.getPrevious()
```
Get the previous state.

```js
/**
 * @param {number} index the index of the history
 * */
stama.getFromHistory(index)
```
Get a state from history

## License
This project is licensed under the MIT License - see the LICENSE file for details.

