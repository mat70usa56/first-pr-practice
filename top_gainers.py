#!/usr/bin/env python3
"""Fetch the top 20 cryptocurrency gainers (24h) from the CoinMarketCap API."""

import os
import sys

import requests

CMC_API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"


def get_top_gainers(api_key: str, limit: int = 20):
    params = {
        "start": "1",
        "limit": "100",
        "sort": "percent_change_24h",
        "sort_dir": "desc",
        "convert": "USD",
    }
    headers = {
        "Accepts": "application/json",
        "X-CMC_PRO_API_KEY": api_key,
    }

    response = requests.get(CMC_API_URL, headers=headers, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()["data"]
    return data[:limit]


def main():
    api_key = os.environ.get("CMC_API_KEY")
    if not api_key:
        print("Error: set the CMC_API_KEY environment variable.", file=sys.stderr)
        sys.exit(1)

    gainers = get_top_gainers(api_key)

    print(f"{'Rank':<5}{'Symbol':<10}{'Name':<20}{'Price (USD)':<15}{'24h Change':<10}")
    for rank, coin in enumerate(gainers, start=1):
        quote = coin["quote"]["USD"]
        print(
            f"{rank:<5}{coin['symbol']:<10}{coin['name']:<20}"
            f"${quote['price']:<14,.4f}{quote['percent_change_24h']:>+8.2f}%"
        )


if __name__ == "__main__":
    main()
