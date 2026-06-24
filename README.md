# First PR Practice

This repo exists so I could learn the GitHub pull request workflow with Claude.

## What this is

A tiny sandbox repo to practice:
- cloning
- branching
- committing changes
- opening a pull request
- merging

## Crypto Dashboard

A small mobile-friendly crypto price dashboard (`index.html`, `style.css`, `app.js`).
It fetches live prices for a handful of coins from the public
[CoinGecko API](https://www.coingecko.com/) — no API key needed.

To try it locally, just open `index.html` in a browser (or serve the folder
with any static file server) and view it at a phone-sized width.

## Status

Just getting started!

## CMC top gainers script

`top_gainers.py` fetches the top 20 cryptocurrency gainers (by 24h price
change) from the CoinMarketCap API.

### Setup

```
pip install -r requirements.txt
export CMC_API_KEY=your_coinmarketcap_api_key
```

### Usage

```
python top_gainers.py
```
