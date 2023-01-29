import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31618598-dd0b87f36bc5180b6dfd99237';

export async function fetchImages(searchQuery, pageNumber) {
  try {
    const resp = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageNumber,
        per_page: 12,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
