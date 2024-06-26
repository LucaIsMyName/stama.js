import stama from '../../../../js/stama.js';
import { db } from '../app.js'

console

export function Header() {
  return `
    <header>
      <h1>${stama.get('appName')}</h1>
      <p>Welcome Home <span data-state-key="userFirstName">${stama.get('userFirstName')}</span> ${stama.get('userLastName')}</p>
    </header>
  `
}