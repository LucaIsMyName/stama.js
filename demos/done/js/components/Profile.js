import stama from '../../../../js/stama.js';
import { db } from '../app.js'

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
        <p data-state-key="userLastName">${user.id}</p>
        <p data-state-key="userLastName">${user.mail}</p>
    </div>
  `
}