import stama from '../../../../js/stama.js';
import { db } from '../app.js'

import { Header } from './Header.js'
import { Main } from './Main.js'


/**
 * Ui component rendering the Header, Main, and a button.
 * @returns {string} The HTML string for the UI.
 */
export function Ui() {
  return `
  ${Header()}
  ${Main()}
  <button id="changeUserFirstName">Change Something</button>
  `
}

/**
 * Callback function to handle changes to the userFirstName state.
 */
function changeUserFirstName() {
  document.querySelectorAll('#userFirstName').forEach(element => {
    element.textContent = stama.get('userFirstName');
  }
  );
}

// This should be called after the UI has been rendered.
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('changeUserFirstName');

  if (button) {
    button.addEventListener('click', () => {
      stama.set('userFirstName', 'Jane');
      console.log(stama.get('userFirstName'));
    });
  }

  stama.subscribe('userFirstName', () => {
    changeUserFirstName();
  });

});
