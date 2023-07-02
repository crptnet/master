export default async function GetDataCoin(symbol) {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}`, {
      method: 'GET',
      mode : 'cors',
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
  });
  const data = response.json();
  return {name: data.name, description: data.description, image: data.image}
}