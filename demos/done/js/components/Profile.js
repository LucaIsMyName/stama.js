import { stama, db, updateAllStateInstances } from '../app.js'

export function Profile() {

  let user = {
    firstName: stama.get('userFirstName'),
    lastName: stama.get('userLastName'),
    mail: stama.get('userMail'),
    id: stama.get('userId'),
  }

  return `
    <div>
        <p><span data-state-key="userFirstName">${user.firstName}</span> 
        <span data-state-key="userLastName">${user.lastName}</span></p>
        <p data-state-key="userId">${user.id}</p>
        <p data-state-key="userMail">${user.mail}</p>
    </div>
  `
}