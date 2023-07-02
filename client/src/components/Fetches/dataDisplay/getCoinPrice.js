import ServerLink from "../../..";

export default async function getCoinPrice(coin) {
    const link = `${ServerLink}api/coins?limit=1&offset=0&query=${coin}`;
    const response = await fetch(link, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
    });
    const data = await response.json();
    return data[0].quotes.USD.price;
  }