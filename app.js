//  Finding the city and state by typing in the Input Field and matching it against the .json

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const input = document.querySelector('input');
const userSearch = document.querySelector('.user-search');
const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

// finding the matches in data while user types in
function findMatch(wordMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
};

function displayMatch() {
    const matchArray = findMatch(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
        return `
        <li>
            <span>${cityName}, ${stateName}</span>
            <span>${place.population}</span>
        </li>
        `;
    }).join('');
    userSearch.innerHTML = html;
};

input.addEventListener('change', displayMatch);
input.addEventListener('keyup', displayMatch);





