import stama from '../../../../js/stama.js';
import { db } from '../app.js'

export function Main() {
  return `
    <main>
      <h1>${db.content[stama.get('currentPage')].title}</h1>
      ${db.content[stama.get('currentPage')].body.map(block => {
    return `
      <div class="${block.blockType} ${block.blockTypeVariant}">${block.content}</div>
    `}).join('')
    }
    </main>
  `
}