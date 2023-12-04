import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const catInfoEl = document.querySelector('.cat-info');

selectEl.addEventListener('change', onSelectElChange);

fetchBreeds()
  .then(breeds => {
    renderOptions(breeds);
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    loaderEl.style.visibility = 'hidden';
  });

function renderOptions(breeds) {
  const markup = breeds
    .map(breed => {
      return `
              <option value=${breed.id}>${breed.name}</option>
          `;
    })
    .join('');
  selectEl.insertAdjacentHTML('beforeend', markup);
  selectEl.hidden = false;
  loaderEl.style.visibility = 'hidden';
}

function onSelectElChange(event) {
  catInfoEl.innerHTML = '';
  loaderEl.style.visibility = 'visible';
  fetchCatByBreed(event.target.value)
    .then(([cat]) => {
      loaderEl.style.visibility = 'hidden';
      catInfoEl.hidden = false;
      catInfoEl.innerHTML = `<img src="${cat.url}" width="400" alt="${cat.breeds[0].id}">
    <h3>${cat.breeds[0].name}</h3>
    <p>Description: ${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>`;
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      loaderEl.style.visibility = 'hidden';
    });
}
