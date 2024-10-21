'use strict';

// VARIABLES

let userCountrySel = null;
let userCapitalSel = null;
let selectedCountryButton = null;
let selectedCapitalButton = null;

// Map for country and capitals
const countryMap = new Map([
  ['USA', 'DC'],
  ['JAPAN', 'TOKYO'],
  ['FRANCE', 'PARIS'],
  ['United Kingdom', 'England']
]);

// Get container
const mapContainer = document.getElementById('countries-container');

const createButton = (text, onClick) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
};

const resetButtons = () => {
  userCountrySel = null;
  userCapitalSel = null;

  if (selectedCountryButton) {
    // Remove 'selected' CSS class
    selectedCountryButton.classList.remove('selected');
    selectedCountryButton = null;
  }

  if (selectedCapitalButton) {
    // Remove 'selected' CSS class
    selectedCapitalButton.classList.remove('selected');
    selectedCapitalButton = null;
  }
};

const checkMatch = () => {
  if (userCountrySel && userCapitalSel) {
    if (countryMap.get(userCountrySel) === userCapitalSel) {
      // Match found; remove the buttons
      mapContainer.removeChild(selectedCountryButton);
      mapContainer.removeChild(selectedCapitalButton);
      resetButtons(); // Reset selections
    } else {
      // If not a match, alert the user
      alert('Incorrect match. Try again!');
      resetButtons(); // Reset selections
    }
  }
};

const handleCountrySelect = (country, countryBtn) => {
  if (selectedCountryButton) {
    selectedCountryButton.classList.remove('selected');
  }

  userCountrySel = country;
  selectedCountryButton = countryBtn;
  selectedCountryButton.classList.add('selected');

  checkMatch();
};

const handleCapitalSelect = (capital, capitalBtn) => {
  if (selectedCapitalButton) {
    selectedCapitalButton.classList.remove('selected'); // Ensure only one capital is selected at a time
  }

  userCapitalSel = capital;
  selectedCapitalButton = capitalBtn;
  selectedCapitalButton.classList.add('selected');

  checkMatch();
};

// Create buttons for countries and capitals
countryMap.forEach((capital, country) => {
  const countryBtn = createButton(country, () => handleCountrySelect(country, countryBtn));
  const capitalBtn = createButton(capital, () => handleCapitalSelect(capital, capitalBtn));

  mapContainer.appendChild(countryBtn);
  mapContainer.appendChild(capitalBtn);
});
