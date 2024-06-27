

/**
 * @class stama
 * @description A simple state management system with undo/redo support
 */
class stama {
  constructor(persist = true) {
    this.state = this.getFromLocalStorage() || {};
    this.listeners = {};
    this.middlewares = [];
    this.previousState = {}; // Store previous states
    this.persist = persist;
    this.debugMode = false;
    this.history = []; // Array to store state history
    this.historyIndex = -1; // Index to track current state in history
    this.elements = new Map(); // Map to track elements and their keys
    if (this.debugMode) {
      console.log('stama initialized', this.state);
    }
  }

  /**
   * Get the current value of a state by key
   * @param {string} key - The state key
   * @returns {*} The value of the state
   */
  get(key) {
    if (this.state[key] === undefined) {
      console.warn(`State key "${key}" not found`);
    }

    if (this.getFromLocalStorage(key) !== null) {
      this.state = this.getFromLocalStorage();
    }

    return this.state[key];
  }


  /**
   * Set the value of a state and notify listeners, and add to history
   * @param {string} key - The state key
   * @param {*} value - The new value of the state
   */
  set(key, value) {
    // Save current state to history before setting new value
    const currentState = { ...this.state };
    this.history.push(currentState);
    this.historyIndex++;

    // Update state with new value
    this.previousState[key] = this.state[key];
    this.runMiddlewares(key, value);
    this.state[key] = value;

    // Persist to local storage if enabled
    if (this.persist) {
      this.setToLocalStorage();
    }

    // Debug mode logging
    if (this.debugMode) {
      console.log(`State changed: ${key} = ${value}`);
    }

    // Notify listeners
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(value));
    }
  }

  /**
 /**
   * Subscribe to changes of a specific state key and update the element when the state changes
   * @param {string} key - The state key
   * @param {HTMLElement} element - The DOM element to update
   * @returns {string}  The current value of the state key wrappen in a span element with a unique State Instance ID
   * @description 
   * listen to state changes and update the element automatically, 
   * this method should be used when the value changed is a Inner 
   * HTML Element and visible in the DOM (returns the value wrappen 
   * in a <span> element).
   * use the subscribe('') method if you want to change attributes dynamically
   */
  listen(key) {
    // Ensure the key exists in the state
    if (this.state[key] === undefined) {
      console.warn(`State key "${key}" not found`);
      return `{{${key}}}`;
    }

    // Generate a unique placeholder ID
    const placeholderId = `stama-${key}-${Math.random().toString(36).substr(2, 9)}`;

    // Store the element reference in the map
    if (!this.elements.has(key)) {
      this.elements.set(key, []);
    }
    this.elements.get(key).push(placeholderId);

    // Subscribe to changes for the key
    this.subscribe(key, (newValue) => {
      this.updateElements(key, newValue);
    });

    // Return the placeholder for the element
    return `<span id="${placeholderId}">${this.get(key)}</span>`;
  }

  /**
   * Update the elements associated with a state key
   * @param {string} key - The state key
   * @param {*} newValue - The new value of the state key
   */
  updateElements(key, newValue) {
    if (this.elements.has(key)) {
      const elements = this.elements.get(key);
      elements.forEach(placeholderId => {
        const element = document.getElementById(placeholderId);
        if (element) {
          element.innerText = newValue;
        }
      });
    }
  }

  /**
   * Work in Progress - Start
   */

  /**
   * Set a state value in the URL as a query parameter
   * @param {string} key - The state key
   * @param {*} value - The value to set in the URL
   */
  setUrlParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
    this.set(key, value);
    this.debugMode ? console.log(`set url param: ${key} = ${value}`) : null;
  }

  /**
   * Get a state value from the URL query parameters
   * @param {string} key - The state key
   * @returns {*} The value from the URL query parameters or null if not found
   */
  getUrlParam(key) {
    const url = new URL(window.location);
    const value = url.searchParams.get(key);
    if (value !== null) {
      this.set(key, value);
    }
    this.debugMode ? console.log(`get url param: ${key} = ${value}`) : null;
    return value;
  }

  /**
   * Synchronize the state with the URL query parameters
   * @param {Array<string>} keys - The state keys to synchronize
   */
  syncStateWithUrl(keys) {
    keys.forEach((key) => {
      const value = this.getUrlParam(key);
      if (value !== null) {
        this.set(key, value);
      } else {
        const stateValue = this.get(key);
        if (stateValue !== undefined) {
          this.setUrlParam(key, stateValue);
        }
      }
    });
  }

  /**
   * Initialize the state from URL parameters on page load
   * @param {Array<string>} keys - The state keys to initialize from URL parameters
   */
  initFromUrl(keys) {
    keys.forEach((key) => {
      const value = this.getUrlParam(key);
      if (value !== null) {
        this.set(key, value);
      }
    });
  }

  /**
   * Subscribe to changes of a specific state key
   * @param {string} key - The state key
   * @param {function} callback - The callback function to be called when the state changes
   * @returns {void}
   * @description
   * subscribe to state changes and update the App or UI with the callback function
   */
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
  }

  /**
   * 
   * @param {Array<string>} keys 
   * @param {Function} callback 
   * @returns {void}
   * @description
   * subscribe 1 or more state key changes to a callback function
   */

  subscribeMany(keys, callback) {
    keys.forEach((key) => {
      this.subscribe(key, callback);
    });
  }

  /**
   * Unsubscribe from changes of a specific state key
   * @param {string} key - The state key
   * @param {function} callback - The callback function to be removed
   * @returns {void}
   * @description
   * unsubscribe from state changes and remove the callback function
   */
  unsubscribe(key, callback) {
    if (this.listeners[key]) {
      this.listeners[key] = this.listeners[key].filter(
        (listener) => listener !== callback
      );
    }
  }

  /**
   * Unsubscribe all listeners from a specific state key
   * @param {string} key - The state key
   * @returns {void}
   * @description
   * unsubscribe all listeners from state changes
   */
  unsubscribeAll(key) {
    if (this.listeners[key]) {
      delete this.listeners[key];
    }
  }

  /**
   * Save the current state to local storage
   * @param {string} itemName - The name of the local storage item
   * @returns {void}
   * @description
   * save the current state to local storage
   */
  setToLocalStorage(itemName = 'stama') {
    localStorage.setItem(itemName, JSON.stringify(this.state));
  }

  /**
   * Load the state from local storage
   * @returns {Object|null} The state object or null if not found
   * @description
   * load the state from local storage
   */
  getFromLocalStorage(itemName = 'stama') {
    const state = localStorage.getItem(itemName);
    return state ? JSON.parse(state) : null;
  }

  /**
   * Reset the state to an initial value or clear it
   * @param {Object} initialState - The initial state to reset to
   * @param {string} fromLocalStoreObject - The local storage object to reset from
   * @returns {void}
   * @description
   * reset the state to an initial value or clear it
   */
  reset(initialState = {}, fromLocalStoreObject = 'stama') {
    this.state = initialState;
    if (this.persist) {
      this.setToLocalStorage(fromLocalStoreObject);
    }
    for (const key in this.listeners) {
      if (this.listeners.hasOwnProperty(key)) {
        this.listeners[key].forEach((callback) => callback(initialState[key]));
      }
    }
    // Clear history after reset
    this.clearHistory();
  }

  /**
   * Update multiple state keys at once
   * @param {Object} updates - An object containing the state keys and their new values
   * @returns {void}
   * @description
   * update multiple state keys at once
   */
  setMany(updates) {
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        this.set(key, updates[key]);
      }
    }
  }

  /**
   * Add a middleware function to intercept state changes
   * @param {function} middleware - The middleware function
   */
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Run all middleware functions
   * @param {string} key - The state key
   * @param {*} value - The new value of the state
   */
  runMiddlewares(key, value) {
    this.middlewares.forEach((middleware) => middleware(key, value));
  }

  /**
   * Remove a specific state key
   * @param {string} key - The state key
   */
  remove(key) {
    delete this.state[key];
    if (this.persist) {
      this.setToLocalStorage();
    }
  }

  /**
   * Clear all state keys and values
   */
  clear() {
    this.state = {};
    if (this.persist) {
      this.setToLocalStorage();
    }
    // Clear history after clearing state
    this.clearHistory();
  }

  /**
   * Get all state keys
   * @returns {Array<string>} An array of all state keys
   */
  getAllKeys() {
    return Object.keys(this.state);
  }

  /**
   * Merge a given state object with the current state
   * @param {Object} newState - The new state object to merge
   */
  merge(newState) {
    this.state = { ...this.state, ...newState };
    if (this.persist) {
      this.setToLocalStorage();
    }
  }

  /**
   * Save only a part of the state to local storage
   * @param {Array<string>} keys - The keys to save to local storage
   */
  setPartToLocalStorage(keys, itemName = 'stama_part') {
    const partialState = {};
    keys.forEach((key) => {
      if (this.state.hasOwnProperty(key)) {
        partialState[key] = this.state[key];
      }
    });
    localStorage.setItem(itemName, JSON.stringify(partialState));
  }

  /**
   * Load only a part of the state from local storage
   * @param {Array<string>} keys - The keys to load from local storage
   */
  getPartFromLocalStorage(keys, itemName = 'stama_part') {
    const state = JSON.parse(localStorage.getItem(itemName)) || {};
    keys.forEach((key) => {
      if (state.hasOwnProperty(key)) {
        this.state[key] = state[key];
      }
    });
  }

  /**
   * Get the previous value of a state key
   * @param {string} key - The state key
   * @returns {*} The previous value of the state key
   */
  getPrevious(key) {
    return this.previousState[key];
  }

  /**
   * Undo the last state change globally
   */
  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const previousState = this.history[this.historyIndex];
      this.state = { ...previousState };

      if (this.persist) {
        this.setToLocalStorage();
      }

      // Notify listeners for all keys that changed
      Object.keys(previousState).forEach((key) => {
        if (this.listeners[key]) {
          this.listeners[key].forEach((callback) => callback(previousState[key]));
        }
      });
    }
  }

  /**
   * Redo the last undone state change globally
   */
  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const nextState = this.history[this.historyIndex];
      this.state = { ...nextState };

      if (this.persist) {
        this.setToLocalStorage();
      }

      // Notify listeners for all keys that changed
      Object.keys(nextState).forEach((key) => {
        if (this.listeners[key]) {
          this.listeners[key].forEach((callback) => callback(nextState[key]));
        }
      });
    }
  }

  /**
   * Clear history and reset history index
   */
  clearHistory() {
    this.history = [];
    this.historyIndex = -1;
  }

  /**
   * @param {*} index 
   * @returns 
   */

  getFromHistory(index) {
    return this.history[index];
  }

  /**
   * Enable or disable debug mode
   * @param {boolean} enable - Whether to enable or disable debug mode
   */
  setDebugMode(enable) {
    this.debugMode = enable;
  }

  /**
   * Enable or disable state persistence
   * @param {boolean} enable - Whether to enable or disable state persistence
   */
  setPersist(enable) {
    this.persist = enable;
  }
}

export default new stama();
