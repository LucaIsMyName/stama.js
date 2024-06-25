import stama from '../../../../js/stama.js';
import {db} from '../app.js'

export function Profile() {
  return `
    <div>
      <p>${stama.get('state').user.firstName} ${stama.get('state').user.lastName}</p>
    </div>
  `
}