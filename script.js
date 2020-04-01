// Todos
// API call ✅
// theme toggle ✅
// search
// filter
// details modal

const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');

getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
    countriesEl.innerHTML = '';

    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');
    
        countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="Germany">
            </div>

            <div class="card-body">
                <h2 class="country-name">${country.name}</h2>
                <p>
                    <strong>Population: </strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region: </strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital: </strong>
                    ${country.capital}
                </p>
            </div>
        `;

        countriesEl.appendChild(countryEl);
    });
}

// toggle theme event listener
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// show & hide the filter options list
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});

// search input function
searchEl.addEventListener('input', (e) => {
    const { value } = e.target
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block'; 
            // .country-name -> .card-body -> .card
            // go up two levels to the countryEl.innerHTML; if it matches, display
        } else {
            name.parentElement.parentElement.style.display = 'none';
        }
    });
});

// search countries by region; or, add a filter to the lis inside the .dropdown
regionFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

    countryRegion.forEach(region => {
        if(region.innerText.includes(value) || value === 'All') {
            region.parentElement.parentElement.style.display = 'block'; 
            // .country-region -> .card-body -> .card
        } else {
            region.parentElement.parentElement.style.display = 'none';
        }
    });
    });
});