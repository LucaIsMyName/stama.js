import { stama } from '../app.js';
/**
 * @name updateAllStateInstances
 * @param {string} key 
 * @returns {void} 
 */

export function updateAllStateInstances(key) {
  document.querySelectorAll(`[data-state-key="${key}"]`).forEach(element => {
    element.innerHTML = stama.get(key);
    if (element.hasAttribute('data-state-value')) {
      element.setAttribute('data-state-value', stama.get(key).toString());
    }
  });
}