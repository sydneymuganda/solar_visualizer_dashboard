import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VcomDataComponent = () => {
  const [vcomData, setVcomData] = useState(null);

  useEffect(() => {
    const getVcomData = async () => {
      const api_key = 'gpbgpSav1s';
      const username = 'wanda.majikijela@dschool.org.za';
      const password = 'Wanda#123';

      const url = 'https://api.meteocontrol.de/v2/systems/abbreviations';
      const credentials = btoa(`${username}:${password}`);
      const headers = {
        Authorization: `Basic ${credentials}`,
        'X-API-KEY': api_key,
      };

      try {
        const response = await axios.get(url, { headers });
        setVcomData(response.data);
      } catch (error) {
        console.error('Error fetching VCOM data:', error);
        setVcomData(null);
      }
    };

    getVcomData();
  }, []);

  return (
    <div>
      <h1>VCOM Data</h1>
      {vcomData ? (
        <pre>{JSON.stringify(vcomData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VcomDataComponent;