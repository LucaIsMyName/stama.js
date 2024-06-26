import stama from '../../../js/stama.js';
import { updateAllStateInstances } from './functions/updateAllStateInstances.js';
import { Ui } from './components/Ui.js';

export { stama, updateAllStateInstances }

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
      publishTime: { day: '2020-01-01', time: '20:32:23' },
      editTime: { day: '2023-05-01', time: '13:21:53' }
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
          blockTypeVariant: 'paragraph',
          content: 'This is the second post',
        }
      ],
      publishTime: { day: '2021-03-07', time: '10:47:23' },
      editTime: { day: '2023-03-12', time: '13:21:53' }
    }
  ]
}

// User Data State
stama.set('userFirstName', db.user.firstName);
stama.set('userLastName', db.user.lastName);
stama.set('userMail', db.user.mail);
stama.set('userId', db.user.id);
stama.set('colorTheme', db.user.colorTheme);

// Initial Open Page
stama.set('currentPage', db.content[0].id);

// Initial Section inside the Page to Scroll to on DOM Load
stama.set('currentPageSectionId', db.content[0].body[0].id);

stama.set('appName', db.app.name);
stama.set('appVersion', db.app.version);
stama.set('appDescription', db.app.description);

// Append App to HTML

document.querySelector('#app').innerHTML = `${Ui()}`;

/**
 * Interactions and State Management
 */

document.addEventListener('DOMContentLoaded', () => {

  /** Handle User Profile Changes */
  const changeUserDataForm = document.getElementById('changeUserDataForm');
  if (changeUserDataForm) {
    changeUserDataForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(changeUserDataForm);
      console.log(formData);
      const userFirstName = formData.get('userFirstName');
      const userLastName = formData.get('userLastName');
      const userMail = formData.get('userMail');
      stama.set('userFirstName', userFirstName);
      stama.set('userLastName', userLastName);
      stama.set('userMail', userMail);
    });
  }
  stama.subscribe('userFirstName', () => { updateAllStateInstances('userFirstName') });
  stama.subscribe('userLastName', () => { updateAllStateInstances('userLastName') });
  stama.subscribe('userMail', () => { updateAllStateInstances('userMail') });

  // Change User colorTheme and update all State Instances
  const colorThemeButton = document.getElementById('changeColorTheme');
  if (colorThemeButton) {
    colorThemeButton.addEventListener('click', () => {
      if (stama.get('colorTheme') === 'dark') {
        stama.set('colorTheme', 'light');
        stama.setToLocalStorage();
      } else {
        stama.set('colorTheme', 'dark');
        stama.setToLocalStorage();
      }
    });
  }
  stama.subscribe('colorTheme', () => {
    const uiWrapper = document.querySelector('[data-ui-wrapper]');
    const colorTheme = stama.get('colorTheme');
    if (colorTheme) {
      uiWrapper.setAttribute('data-color', colorTheme);
    }
    updateAllStateInstances('colorTheme');
  });

  stama.batchSubscribe([
    'colorTheme',
    'userFirstName',
  ], () => {
    console.log('Test Batch Subscribe')
  })

  stama.getAllKeys().map(key => {
    console.log(key);
  });

});
