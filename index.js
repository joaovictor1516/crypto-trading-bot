const axios = require("axios");
const crypto = require("node:crypto");
const { URLSearchParams } = require("node:url");
require("dotenv").config();

const symbol = "BTCUSDT";
const quantity = "0.001";//este valor se refere à moeda à esqueda, no nosso caso é o BSC, vulgo bitcoin.
const period = 14;
let isOpened = false;

const api_url = "https://testnet.binance.vision"; //"https://api.binance.com"
const api_key = process.env.API_KEY;
const secret_key = process.env.SECRET_KEY;

function avareges(prices, period, startIndex){
    let gains = 0;
    let losses = 0;

    for(let i = 0; i < period && i + startIndex < prices.length; i++){
        const difference = prices[i + startIndex] - prices[i + startIndex - 1];

        difference >= 0 ? gains += difference : losses += Math.abs(difference);
    }

    //cálculo das médias simples:
    const avgGains = gains / period;
    const avgLosses = losses / period;

    return {avgGains, avgLosses};
}

function rsi(prices, period){
    let avgGains = 0;
    let avgLosses = 0;

    for(let i = 1; i < prices.length; i++){
        const newAvareges = avareges(prices, period, i);

        //médias simples que foram calculadas no avageres:
        if(i === 1){
            avgGains = newAvareges.avgGains; 
            avgLosses = newAvareges.avgLosses;
            continue;
        }

        //calculo das médias exponenciais:
        avgGains = (avgGains * (period - 1) + newAvareges.avgGains) / period; 
        avgLosses = (avgLosses * (period - 1) + newAvareges.avgLosses) / period;
    }

    const rs = avgGains / avgLosses;
    return 100 - (100 / (1 + rs));
}

async function newOrder(symbol, quantity, side){
    const order = {symbol, quantity, side};
    order.type = "MARKET";
    order.timestamp = Date.now();

    const signature = crypto
        .createHmac("sha256", secret_key)
        .update(new URLSearchParams(order).toString())
        .digest("hex");

    order.signature = signature;

    try{
        const { data } = await axios.post(`${api_url}/api/v3/order`, 
                new URLSearchParams(order).toString(), 
                {
                    headers: {
                        "X-MBX-APIKEY": api_key
                }
        });
        
        console.log(data)
    } catch(error){
        console.error(error.response.data);
        return;
    }
}

async function start(){
    const { data } = await axios.get(`${api_url}/api/v3/klines?limit=100&interval=15m&symbol=${symbol}`);

    const candle = data[data.length - 1];
    const lastPrice = parseFloat(candle[4]);

    // console.clear();
    console.log(lastPrice);

    const prices = data.map((quantity) => parseFloat(quantity[4]));
    const rsiResults = rsi(prices, period);
    
    console.log(`O RSI é de ${rsiResults}.`);

    if(rsiResults <30  && !isOpened){
        console.log(`Tem muita gente vendendo, hora de comprar!!`);
        await newOrder(symbol, quantity, "BUY");
        isOpened = true;
    } else if(rsiResults > 70 && isOpened){
        console.log(`Tem muita gente comprando, hora de vender!!`);
        await newOrder(symbol, quantity, "SELL");
        isOpened = false;
    } else{
        console.log("Está normal melhor esperar!!");
    }
}

setInterval(start, 3000);