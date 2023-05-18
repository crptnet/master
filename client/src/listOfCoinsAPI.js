export default async function GetListOfCoins() {
  const response = await fetch("http://3.8.56.163/api/coins?limit=2500&offset=0&orderby=rank_asc", {
      method: 'GET',
      mode : 'cors',
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
  });
  return response.json();
}