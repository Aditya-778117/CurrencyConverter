document.addEventListener("DOMContentLoaded", () => {
    fetchCurrencies();
    setInterval(updateLiveRates, 5000); // Update live exchange rates every 5 sec
});

function fetchCurrencies() {
    fetch("https://open.er-api.com/v6/latest/USD")
        .then(response => response.json())
        .then(data => {
            const currencySelects = document.querySelectorAll("select");
            Object.keys(data.rates).forEach(currency => {
                currencySelects.forEach(select => {
                    let option = document.createElement("option");
                    option.value = currency;
                    option.textContent = currency;
                    select.appendChild(option);
                });
            });
        })
        .catch(error => console.error("Error fetching currencies:", error));
}

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(() => {
            document.getElementById("result").textContent = "Error fetching conversion rates.";
        });
}

function updateLiveRates() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (fromCurrency && toCurrency) {
        fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                document.getElementById("result").textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
            })
            .catch(() => {
                document.getElementById("result").textContent = "Live rates unavailable.";
            });
    }
}

document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
