const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { path } = event;
  const apiUrl = `https://restcountries.com/v3.1${path.replace('/.netlify/functions/proxy', '')}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};