import stama from '../../../../js/stama.js';
/**
 * Callback function to handle changes to the userFirstName state.
 */
export function changeUserFirstName() {
  document.querySelectorAll('[data-state-key="userFirstName"]').forEach(element => {
    element.innerHTML = stama.get('userFirstName');
  }
  );
}