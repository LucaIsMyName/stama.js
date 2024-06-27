import { stama, db, updateAllStateInstances } from '../app.js'

console

export function Header() {
  return `
    <header>
      <h1>${stama.get('appName')}</h1>
      <p>Welcome Home 
        ${stama.listen('userFirstName')}
        ${stama.listen('userLastName')}</p>
        ${stama.listen('userMail')}</p>
    </header>
  `
}