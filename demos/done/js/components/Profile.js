import { stama } from '../app.js';

export function Profile() {
  let listen = key => { stama.listen(key) };
  const user = {
    firstName: stama.listen('userFirstName'),
    lastName: stama.listen('userLastName'),
    mail: stama.listen('userMail'),
    id: stama.listen('userId'),
  };

  return `
    <div>
        <p>
            ${user.firstName} 
            ${user.lastName}
        </p>
        <p>${user.id}</p>
        <p>${user.mail}</p>
    </div>
  `;

}
