import axios from 'axios';
export { fetchBreeds, fetchCatByBreed };

axios.defaults.headers.common['x-api-key'] =
  'live_POfV1uJOXyBmJkzY9B17WWSw18XlJCLCRMs491f6N3Hdbjm9GEVQues8X3cu1gLP';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(resp => {
    if (!resp.statusText === 'OK') {
      throw new Error();
    }
    return resp.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(resp => {
      if (!resp.statusText === 'OK') {
        throw new Error();
      }
      return resp.data;
    });
}
