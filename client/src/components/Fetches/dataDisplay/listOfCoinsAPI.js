import ServerLink from "../../..";

export default async function GetListOfCoins(limit,offset) {
  const response = await fetch(`${ServerLink}coins?limit=${limit}&offset=${offset}&orderby=rank_asc`, {
      method: 'GET',
      mode : 'cors',
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
  });
  return response.json();
}