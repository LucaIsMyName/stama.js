import stama from '../../../../js/stama.js';
import { db } from '../app.js'

import { Header } from './Header.js'
import { Main } from './Main.js'
import { Profile } from './Profile.js'

import { changeUserFirstName } from '../functions/changeUserFirstName.js';

/**
 * Ui component rendering the Header, Main, and a button.
 * @returns {string} The HTML string for the UI.
 */
export function Ui(
  colorTheme = db.user.colorTheme || 'light',
) {
  return `
  <section data-ui-wrapper data-color="${colorTheme}">
    ${Header()}
    ${Main()}
    <button id="changeUserFirstName">Change First Name</button>
    <button id="changeColorTheme">Change Color Theme </button>
    ${Profile()}
  </section>
  `
}

/**
 * @name updateAllStateInstances
 * @param {string} key 
 * @returns {void}
 */

function updateAllStateInstances(key) {
  document.querySelectorAll(`[data-state-key="${key}"]`).forEach(element => {
    element.innerHTML = stama.get(key);
  });
}

function changeColorTheme() {
  updateAllStateInstances('colorTheme');
}

// Manage the State

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('changeUserFirstName');
  if (button) {
    button.addEventListener('click', () => {
      stama.set('userFirstName', 'Jane');
    });
  }
  stama.subscribe('userFirstName', () => {
    updateAllStateInstances('userFirstName');
  });



  const colorThemeButton = document.getElementById('changeColorTheme');
  if (colorThemeButton) {
    colorThemeButton.addEventListener('click', () => {
      if (stama.get('colorTheme') === 'dark') {
        stama.set('colorTheme', 'light');
        stama.setToLocalStorage();
      } else {
        stama.set('colorTheme', 'dark');
        stama.setToLocalStorage();
      }
    });
  }
  stama.subscribe('colorTheme', () => {
    const uiWrapper = document.querySelector('[data-ui-wrapper]');
    const colorTheme = stama.get('colorTheme');
    if (colorTheme) {
      uiWrapper.setAttribute('data-color', colorTheme);
    }

    updateAllStateInstances('colorTheme');
  });

});
