document.getElementById("convertBtn").addEventListener("click", function() {
    let tempInput = document.getElementById("tempInput").value;
    let unit = document.getElementById("unitSelect").value;
    let resultDisplay = document.getElementById("result");

    if (isNaN(tempInput) || tempInput === "") {
        resultDisplay.textContent = "Please enter a valid number!";
        return;
    }

    let temp = parseFloat(tempInput);
    let convertedTemp, convertedUnit;

    switch (unit) {
        case "C":
            convertedTemp = {
                Fahrenheit: (temp * 9/5) + 32,
                Kelvin: temp + 273.15
            };
            resultDisplay.textContent = `Fahrenheit: ${convertedTemp.Fahrenheit.toFixed(2)} °F | Kelvin: ${convertedTemp.Kelvin.toFixed(2)} K`;
            break;
        case "F":
            convertedTemp = {
                Celsius: (temp - 32) * 5/9,
                Kelvin: (temp - 32) * 5/9 + 273.15
            };
            resultDisplay.textContent = `Celsius: ${convertedTemp.Celsius.toFixed(2)} °C | Kelvin: ${convertedTemp.Kelvin.toFixed(2)} K`;
            break;
        case "K":
            convertedTemp = {
                Celsius: temp - 273.15,
                Fahrenheit: (temp - 273.15) * 9/5 + 32
            };
            resultDisplay.textContent = `Celsius: ${convertedTemp.Celsius.toFixed(2)} °C | Fahrenheit: ${convertedTemp.Fahrenheit.toFixed(2)} °F`;
            break;
        default:
            resultDisplay.textContent = "Invalid selection!";
    }
});
