export default async function GetListOfCoins(limit,offset) {
  const response = await fetch(`http://3.8.190.201/api/coins?limit=${limit}&offset=${offset}&orderby=rank_asc`, {
      method: 'GET',
      mode : 'cors',
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
  });
  return response.json();
}