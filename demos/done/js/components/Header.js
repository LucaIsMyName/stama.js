import { stama, db, updateAllStateInstances } from '../app.js'

console

export function Header() {
  return `
    <header>
      <h1>${stama.get('appName')}</h1>
      <p>Welcome Home 
        <span data-state-key="userFirstName">${stama.get('userFirstName')}</span> 
        <span data-state-key="userLastName">${stama.get('userLastName')}<span></p>
        <span data-state-key="userMail">${stama.get('userMail')}<span></p>
    </header>
  `
}