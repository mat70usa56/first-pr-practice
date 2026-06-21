const COIN_IDS = ["bitcoin", "ethereum", "solana", "dogecoin", "cardano"];
const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}&order=market_cap_desc&price_change_percentage=24h`;

const listEl = document.getElementById("coin-list");
const statusEl = document.getElementById("status");
const refreshBtn = document.getElementById("refresh-btn");

function formatPrice(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  });
}

function formatChange(value) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function renderCoins(coins) {
  listEl.innerHTML = coins
    .map((coin) => {
      const change = coin.price_change_percentage_24h ?? 0;
      const direction = change >= 0 ? "up" : "down";
      return `
        <li class="coin-card">
          <img class="coin-icon" src="${coin.image}" alt="${coin.name} logo" loading="lazy">
          <div class="coin-info">
            <div class="coin-name">${coin.name}</div>
            <div class="coin-symbol">${coin.symbol}</div>
          </div>
          <div class="coin-price-block">
            <div class="coin-price">${formatPrice(coin.current_price)}</div>
            <div class="coin-change ${direction}">${formatChange(change)}</div>
          </div>
        </li>
      `;
    })
    .join("");
}

async function loadPrices() {
  statusEl.textContent = "Loading prices...";
  refreshBtn.disabled = true;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const coins = await response.json();
    renderCoins(coins);
    const now = new Date().toLocaleTimeString();
    statusEl.textContent = `Updated at ${now}`;
  } catch (error) {
    statusEl.textContent = "Couldn't load prices. Tap refresh to try again.";
    console.error(error);
  } finally {
    refreshBtn.disabled = false;
  }
}

refreshBtn.addEventListener("click", loadPrices);
loadPrices();
