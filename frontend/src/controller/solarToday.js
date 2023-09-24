/* eslint-disable no-undef */
import api from './api';

// Fetch data using Axios
const fetchData = async (date, dataRequest) => {
  try {
    // Get route as String
    const stringRequest = dataRequest + '?date={' + date + '}';
    const response = (await api.get(stringRequest));
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchData;