const API_KEY = "goldapi-5rmfrsm8bguwu9-io"; // Insert your API key
const API_URL = "https://www.goldapi.io/api";
const ounceToGram = 31.1035; // Conversion factor for metals

document.getElementById("fetchRates").addEventListener("click", () => {
    const currency = document.getElementById("countrySelect").value;
    fetchMetalRates(currency);
});

function fetchMetalRates(currency) {
    const metals = ["XAU", "XAG", "XPT", "XCU"]; // Gold, Silver, Platinum, Copper
    let metalData = {};

    let fetchPromises = metals.map(metal =>
        fetch(`${API_URL}/${metal}/${currency}`, {
            headers: { "x-access-token": API_KEY, "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.price) {
                metalData[metal] = (data.price / ounceToGram).toFixed(2);
            }
        })
        .catch(error => console.error(`Error fetching ${metal}:`, error))
    );

    Promise.all(fetchPromises).then(() => {
        // Gold Purities
        let gold24k = metalData["XAU"] || "N/A";
        let gold22k = gold24k !== "N/A" ? ((gold24k * 22) / 24).toFixed(2) : "N/A";
        let gold18k = gold24k !== "N/A" ? ((gold24k * 18) / 24).toFixed(2) : "N/A";

        let silver = metalData["XAG"] || "N/A";
        let platinum = metalData["XPT"] || "N/A";
        let copper = metalData["XCU"] || "N/A";

        // Diamond (Static Price Approximation)
        let diamondPerGram = "7000"; // Adjust based on real-time sources

        document.getElementById("metalsTableBody").innerHTML = `
            <tr><td>Gold (24K)</td> <td>${gold24k} ${currency}/g</td> <td>${(gold24k * 10).toFixed(2)} ${currency}/10g</td> <td>${(gold24k * 1000).toFixed(2)} ${currency}/kg</td></tr>
            <tr><td>Gold (22K)</td> <td>${gold22k} ${currency}/g</td> <td>${(gold22k * 10).toFixed(2)} ${currency}/10g</td> <td>${(gold22k * 1000).toFixed(2)} ${currency}/kg</td></tr>
            <tr><td>Gold (18K)</td> <td>${gold18k} ${currency}/g</td> <td>${(gold18k * 10).toFixed(2)} ${currency}/10g</td> <td>${(gold18k * 1000).toFixed(2)} ${currency}/kg</td></tr>
            <tr><td>Silver</td> <td>${silver} ${currency}/g</td> <td>${(silver * 10).toFixed(2)} ${currency}/10g</td> <td>${(silver * 1000).toFixed(2)} ${currency}/kg</td></tr>
            <tr><td>Platinum</td> <td>${platinum} ${currency}/g</td> <td>${(platinum * 10).toFixed(2)} ${currency}/10g</td> <td>${(platinum * 1000).toFixed(2)} ${currency}/kg</td></tr>
            <tr><td>Copper</td> <td>${copper} ${currency}/g</td> <td>${(copper * 10).toFixed(2)} ${currency}/10g</td> <td>${(copper * 1000).toFixed(2)} ${currency}/kg</td></tr>
            <tr><td>Diamond</td> <td>${diamondPerGram} ${currency}/g</td> <td>${(diamondPerGram * 10).toFixed(2)} ${currency}/10g</td> <td>${(diamondPerGram * 1000).toFixed(2)} ${currency}/kg</td></tr>
        `;
    });
}
