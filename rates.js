document.addEventListener("DOMContentLoaded", () => {
    fetch("https://open.er-api.com/v6/latest/USD")
        .then(response => response.json())
        .then(data => {
            if (!data.rates) throw new Error("No exchange rate data available.");

            const ratesTable = document.getElementById("exchangeRates");
            ratesTable.innerHTML = ""; // Clear loading text

            // Selected major fiat & crypto currencies
            const selectedCurrencies = ["EUR", "GBP", "INR", "JPY", "AUD", "CAD", "BTC", "ETH", "USDT", "BNB"];
            const currencies = [];
            const rates = [];

            selectedCurrencies.forEach(currency => {
                const rate = data.rates[currency];
                if (rate) {
                    const row = `<tr><td>${currency}</td><td>${rate.toFixed(4)}</td></tr>`;
                    ratesTable.innerHTML += row;
                    currencies.push(currency);
                    rates.push(rate);
                }
            });

            // Load chart
            createChart(currencies, rates);
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
            document.getElementById("exchangeRates").innerHTML = "<tr><td colspan='2'>Error loading rates</td></tr>";
        });
});

// Chart.js Graph
function createChart(currencies, rates) {
    const ctx = document.getElementById("rateChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: currencies,
            datasets: [{
                label: "Exchange Rate (per USD)",
                data: rates,
                backgroundColor: [
                    "#FFD700", "#1E90FF", "#32CD32", "#FF4500", "#9932CC",
                    "#FF69B4", "#FF8C00", "#20B2AA", "#4682B4", "#FF1493"
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
