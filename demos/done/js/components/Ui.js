import stama from '../../../../js/stama.js';
import { db, updateAllStateInstances } from '../app.js'

import { Header } from './Header.js'
import { Main } from './Main.js'
import { Profile } from './Profile.js'

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
    ${Profile()}
    <button id="changeUserFirstName">Change First Name</button>
    <button id="changeColorTheme">Change Color Theme </button>
    <p>Current Color Theme: <span data-state-key="colorTheme">${colorTheme}</span></p>
  </section>
  `
}



// Manage Ineractions and State Changes

document.addEventListener('DOMContentLoaded', () => {

  // Change User firstName and update all State Instances
  const button = document.getElementById('changeUserFirstName');
  if (button) {
    button.addEventListener('click', () => {
      stama.set('userFirstName', 'Jane');
    });
  }
  stama.subscribe('userFirstName', () => {
    updateAllStateInstances('userFirstName');
  });

  // Change User colorTheme and update all State Instances
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
