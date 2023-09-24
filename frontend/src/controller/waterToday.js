/* eslint-disable no-undef */
import api from './api';

// Fetch data using Axios
const fetchWaterData = async (date, dataRequest, location) => {
  try {
    // Get route as String
    const stringRequest = dataRequest + '?date={' + date + '}&location={'+location+'}';

    const response = (await api.get(stringRequest));
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};


export default fetchWaterData;