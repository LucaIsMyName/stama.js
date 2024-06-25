import stama from '../../../../js/stama.js';
import { db } from '../app.js'

import { Header } from './Header.js'
import { Main } from './Main.js'

export function Ui() {
  return `
  ${Header()}
  ${Main()}
  `
}