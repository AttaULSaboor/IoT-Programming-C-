document.addEventListener('DOMContentLoaded', function() {

    // Default temperature unit: Celsius
    let currentUnit = 'C';

    // Function to fetch temperature data and update the UI
    function updateData() {
        fetch('/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let temperature = parseFloat(data.temperature);
            let unit = data.unit;
            
            let thermoHeight, thermoColor;
            
            if (unit === 'C') {
                // Assuming max temperature is 100°C
                thermoHeight = Math.min(temperature, 100);
                
                // Transition color from blue to red based on temperature
                thermoColor = `hsl(${240 - (1.2 * thermoHeight)}, 100%, 50%)`;
                
            } else if (unit === 'F') {
                // Assuming max temperature is 212°F (boiling point of water)
                thermoHeight = Math.min(temperature, 212) * (100/212);
                
                // Transition color from blue to red based on temperature
                thermoColor = `hsl(${240 - (1.2 * (thermoHeight/100 * 212))}, 100%, 50%)`;
    
            } else if (unit === 'K') {
                // Assuming max temperature is 373.15K (boiling point of water)
                thermoHeight = Math.min(temperature, 373.15) * (100/373.15);
                
                // Transition color from blue to red based on temperature
                thermoColor = `hsl(${240 - (1.2 * (thermoHeight/100 * 373.15))}, 100%, 50%)`;
            }
            
            // Update thermometer UI
            document.getElementById('thermo-fill').style.height = `${thermoHeight}%`;
            document.getElementById('thermo-fill').style.backgroundColor = thermoColor;
    
            // Update temperature and time information in the UI
            document.getElementById('temperature').textContent = temperature.toFixed(2) + "°" + unit;
            document.getElementById('time').textContent = data.time;
        });
    }

    // Function to fetch and display the sensor ID
    function fetchSensorID() {
        fetch('/sensorID')
        .then(response => response.text())
        .then(id => {
            document.getElementById('sensor-id').textContent = "Sensor ID: " + id;
        });
    }

    // Initial call to fetch sensor ID
    fetchSensorID();

    // Polling mechanism: Fetch and update temperature data every second
    setInterval(updateData, 1000);

});
