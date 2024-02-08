/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
// Personal API Key for OpenWeatherMap API
const apiKey = 'ece56a58cb1f95c25e273fa235a9f0df&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseUrl, zipCode, apiKey)
        .then(data => {
            // Call function to post data
            postData('/all', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: document.getElementById('feelings').value
            })
            .then(() => {
                updateUI(); // Update UI after successful POST request
            })
            .catch(error => console.log('Error posting data:', error));
        })
        .catch(error => console.log('Error fetching weather data:', error));
}

/* Function to GET Web API Data*/
const getWeatherData = async (url, zip, key) => {
    const response = await fetch(`${url}?zip=${zip}&appid=${key}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
        throw error;
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data posted successfully:', newData);
        return newData;
    } catch (error) {
        console.log('Error posting data:', error);
        throw error;
    }
}

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
    }
}