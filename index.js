const axios = require("axios");

const symbol = "BTCUSDT";
const buy_price = 97146.08;
const sell_price = 97685.21;
let isOpened = false;

const api_url = "https://testnet.binance.vision";

async function start(){
    const { data } = await axios.get(`${api_url}/api/v3/klines?limit=21&interval=15m&symbol=${symbol}`);

    const candle = data[data.length - 1];
    const now_price = parseFloat(candle[4]);

    console.clear();
    console.log(now_price);

    if(now_price <= buy_price && !isOpened){
        console.log("Comprar!");
        isOpened = true;
    } else if(now_price >= sell_price && isOpened){
        console.log("Vender!");
        isOpened = false;
    } else{
        console.log("Não agir!");
    }
}

setInterval(start, 3000);