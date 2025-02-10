const axios = require("axios");

const SYMBOL = "BTCUSDT";
const SELL_PRICE = 97146.08;
const BUY_PRICE = 95803.50;

const API_URL = "https://testnet.binance.vision"

async function start(){
    const { data } = await axios.get(`${API_URL}/api/v3/klines?limit=21&interval=15m&symbol=${SYMBOL}`);

    console.log(data);
}

start();

setInterval(start, 3000);