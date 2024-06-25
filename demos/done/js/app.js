import stama from '../../../js/stama.js';
import { Ui } from './components/Ui.js';
// Set `stama` to persistence by enabling local storage
stama.setPersist(true);

// Mock DB
export let db = {
  app: {
    name: 'done',
    version: '1.0.0',
    description: 'A simple app to demonstrate stama.js'
  },
  user: { firstName: 'John', lastName: 'Doe', id: 1, mail: 'j.d@gmail.com', colorTheme: 'light' },
  content: [
    {
      id: 1,
      title: 'First post',
      image: 'https://via.placeholder.com/150',
      authorId: 1,
      body: [
        {
          id: 1,
          blockType: 'text',
          content: 'This is the first post',
        }
      ],
      publishTime: '2020-01-01',
      editTime: '2020-01-01'
    },
    {
      id: 2,
      title: 'Second post',
      image: 'https://via.placeholder.com/150',
      authorId: 2,
      body: [
        {
          id: 1,
          blockType: 'text',
          blockTypeVariant: 'heading-2',
          content: 'Headline 2',
        },
        {
          id: 2,
          blockType: 'text',
          blockTypeVariant: 'text',
          content: 'This is the second post',
        }
      ],
      publishTime: '2022-01-01',
      editTime: '2023-03-12'
    }
  ]
}

// User Data State
stama.set('userFirstName', db.user.firstName);
stama.set('userLastName', db.user.lastName);
stama.set('userMail', db.user.mail);
stama.set('userId', db.user.id);
stama.set('userColorTheme', db.user.colorTheme);

// Initial Open Page
stama.set('currentPage', db.content[0].id);

// Initial Section inside the Page to Scroll to on DOM Load
stama.set('currentPageSectionId', db.content[1].body[0].id);

stama.set('appName', db.app.name);
stama.set('appVersion', db.app.version);
stama.set('appDescription', db.app.description);


// Initial User Color Theme

// Initial User Mail


// Append App to HTML

document.querySelector('#app').innerHTML = `${Ui()}`;

console.log(stama.get('state'));