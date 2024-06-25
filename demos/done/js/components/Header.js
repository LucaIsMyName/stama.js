import stama from '../../../../js/stama.js';
import { db } from '../app.js'

console

export function Header() {
  return `
    <header>
      <h1>${stama.get('appName')}</h1>
      <p>Welcome Home ${stama.get('userFirstName')} ${stama.get('userLastName')}</p>
    </header>
  `
}