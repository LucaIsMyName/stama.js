# stama.js

stama is a simple but useful JS state manager

## methods

```js
stama.set(
  key, 
  value
)
```
sets or creates the value to a given key

```js
stama.get(key)
```
returns the state value of the given key

```js
stama.subscribe(key)
```
dynamically updates a value if it's changed by the user

```js
stama.unsubscribe(key)
```
doesnt update the value anymore if it's changed

```js
stama.batchSet(
  {
    key1: value,
    key2: value
  }
)
```
sets more than 1 key/value at a time

```js
stama.use(
  middlewareFunction()
)
```
insert a middleware function

```js
stama.runMiddleware(
  key, 
  value
  )
```
run the middleware functions

```js
stama.getPrevious(key)
```
restores the previous value of the state


```js
stama.undo(key)
```
undoes the changes made to the state


```js
stama.remove(key)
```
removes the state key/value pair from the DOM/RAM


```js
stama.clear(key)
```
undoes the value of the given key


```js
stama.getAllKeys()
```
returns all key/value state pairs


```js
stama.merge(newState)
```
pushes a new state while storing the old one