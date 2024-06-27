import { stama, db, updateAllStateInstances } from '../app.js'

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
  <section data-ui-wrapper data-color="${stama.listen('colorTheme'), stama.get('colorTheme')}">
    ${Header()}
    ${Main()}
    ${Profile()}
    <form  id="changeUserDataForm">
      <input  type="text" name="userFirstName" placeholder="Enter new first name" required>
      <input type="text" name="userLastName" placeholder="Enter new last name" required>
      <input type="mail" name="userMail" placeholder="Enter new mail adress" required>
      <button type="submit">Change First Name</button>
    </form>
    <button id="changeColorTheme">Change Color Theme </button>
    <p>Current Color Theme: <span data-state-key="colorTheme">${stama.listen('colorTheme')}</span></p>
  </section>
  `
}



