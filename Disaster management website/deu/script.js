const jsonData = {
    "locations": [{
            "name": "Mumbai Central",
            "latitude": 18.975,
            "longitude": 72.825833,
            "nearestHospital": "City Hospital",
            "nearestPhoneBooth": "Booth 1",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Mumbai Central",
            "latitude": 18.984,
            "longitude": 72.808,
            "nearestHospital": "Breach Candy Hospital",
            "nearestPhoneBooth": "Booth 1",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Mumbai Central",
            "latitude": 19.056,
            "longitude": 72.829,
            "nearestHospital": "Lilavati Hospital",
            "nearestPhoneBooth": "Booth 1",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Mumbai Central",
            "latitude": 18.975,
            "longitude": 72.825833,
            "nearestHospital": "Global Hospitals",
            "nearestPhoneBooth": "Booth 1",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Mumbai Central",
            "latitude": 19.219,
            "longitude": 72.829,
            "nearestHospital": "Oscar Hospital",
            "nearestPhoneBooth": "Booth 1",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Mumbai Central",
            "latitude": 18.978,
            "longitude": 72.814,
            "nearestHospital": "Apollo Spectra Hospitals",
            "nearestPhoneBooth": "Booth 1",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Chennai Beach",
            "latitude": 13.0836,
            "longitude": 80.2825,
            "nearestHospital": "Metro Hospital",
            "nearestPhoneBooth": "Booth 2",
            "nearestSafeZone": "Beach Park"
        },
        {
            "name": "Delhi Junction",
            "latitude": 28.643889,
            "longitude": 77.222778,
            "nearestHospital": "Capital Clinic",
            "nearestPhoneBooth": "Booth 3",
            "nearestSafeZone": "Public Garden"
        },
        {
            "name": "Bengaluru City",
            "latitude": 12.977777,
            "longitude": 77.566667,
            "nearestHospital": "Garden Hospital",
            "nearestPhoneBooth": "Booth 4",
            "nearestSafeZone": "Botanical Garden"
        },
        {
            "name": "Hyderabad Junction",
            "latitude": 17.385044,
            "longitude": 78.486671,
            "nearestHospital": "Metropolis Hospital",
            "nearestPhoneBooth": "Booth 5",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Hyderabad Junction",
            "latitude": 17.432,
            "longitude": 78.457,
            "nearestHospital": "Yashoda Hospitals",
            "nearestPhoneBooth": "Booth 5",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Hyderabad Junction",
            "latitude": 17.428,
            "longitude": 78.341,
            "nearestHospital": "Continental Hospitals",
            "nearestPhoneBooth": "Booth 5",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Hyderabad Junction",
            "latitude": 17.439,
            "longitude": 78.483,
            "nearestHospital": "KIMS Hospitals",
            "nearestPhoneBooth": "Booth 5",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Hyderabad Junction",
            "latitude": 17.453,
            "longitude": 78.376,
            "nearestHospital": "Medicover Hospitals",
            "nearestPhoneBooth": "Booth 5",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Kolkata Howrah",
            "latitude": 22.585837,
            "longitude": 88.345328,
            "nearestHospital": "Howrah Hospital",
            "nearestPhoneBooth": "Booth 6",
            "nearestSafeZone": "Botanical Garden"
        },
        {
            "name": "Ahmedabad Junction",
            "latitude": 23.021623,
            "longitude": 72.579707,
            "nearestHospital": "Surya Hospital",
            "nearestPhoneBooth": "Booth 7",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Pune Junction",
            "latitude": 18.5293,
            "longitude": 73.8741,
            "nearestHospital": "Lotus Hospital",
            "nearestPhoneBooth": "Booth 8",
            "nearestSafeZone": "Public Garden"
        },
        {
            "name": "Jaipur Junction",
            "latitude": 26.9124,
            "longitude": 75.7873,
            "nearestHospital": "Pink City Hospital",
            "nearestPhoneBooth": "Booth 9",
            "nearestSafeZone": "Public Park"
        },
        {
            "name": "Lucknow Charbagh",
            "latitude": 26.8467,
            "longitude": 80.9462,
            "nearestHospital": "Royal Hospital",
            "nearestPhoneBooth": "Booth 10",
            "nearestSafeZone": "Public Garden"
        }
    ]
}


const tableHeaders = Object.keys(jsonData.locations[0]);
let map;
let userMarker;
let locationMarkers = [];

// Function to generate the table and update the map based on the input value
function generateTableAndMap(filterValue) {
    const table = document.getElementById("dataTable");

    // Clear existing table rows
    table.innerHTML = "";

    // Clear existing location markers on the map
    locationMarkers.forEach((marker) => {
        marker.setMap(null);
    });
    locationMarkers = [];

    // Filter data based on the input value
    const filteredData = jsonData.locations.filter((location) => {
        return location.name.toLowerCase().includes(filterValue.toLowerCase());
    });

    if (filterValue.trim() === "") {
        // Display "Search for your location" message when the search input is empty
        const noSearchMessage = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = "Search for your location";
        td.setAttribute("colspan", tableHeaders.length);
        noSearchMessage.appendChild(td);
        table.appendChild(noSearchMessage);

        // Center the map to the default location when the input is empty
        map.setCenter({ lat: 18.975, lng: 72.825833 }); // Default location (Mumbai Central) as an example
        map.setZoom(13); // Adjust the zoom level as needed
    } else if (filteredData.length === 0) {
        // Display "No matching data" message when no locations are found
        const noDataMessage = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = "No matching data";
        td.setAttribute("colspan", tableHeaders.length);
        noDataMessage.appendChild(td);
        table.appendChild(noDataMessage);

        // Center the map to the default location when no matching locations are found
        map.setCenter({ lat: 18.975, lng: 72.825833 }); // Default location (Mumbai Central) as an example
        map.setZoom(13); // Adjust the zoom level as needed

        // Remove user location marker from the map when no matching locations are found
        if (userMarker) {
            userMarker.setMap(null);
        }
    } else {
        // Create table rows with filtered data
        filteredData.forEach((location) => {
            const row = document.createElement("tr");
            tableHeaders.forEach((header) => {
                const td = document.createElement("td");
                td.textContent = location[header];
                row.appendChild(td);
            });
            table.appendChild(row);

            // Show markers for the filtered locations on the map
            const locationLatLng = { lat: location.latitude, lng: location.longitude };
            const locationMarker = new google.maps.Marker({
                position: locationLatLng,
                map: map,
                title: location.name,
            });
            locationMarkers.push(locationMarker);
        });

        // Display user's location marker on the map if it matches any data
        if (userMarker) {
            userMarker.setMap(null);
        }

        // Get the first matching location to display on the map
        const firstMatchingLocation = filteredData[0];
        const userLocation = {
            lat: firstMatchingLocation.latitude,
            lng: firstMatchingLocation.longitude,
        };
        showUserLocation(userLocation);
    }
}

// Function to handle input change
function handleInputChange() {
    const searchInput = document.getElementById("searchInput");
    const filterValue = searchInput.value.trim();
    generateTableAndMap(filterValue);
}

// Function to initialize the map
function initMap() {
    const initialLocation = { lat: 18.975, lng: 72.825833 }; // Default location (Mumbai Central) as an example
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialLocation,
        zoom: 13, // Adjust the zoom level as needed
    });

    // Add user location button functionality
    document.getElementById("addLocationBtn").addEventListener("click", addUserLocation);
}

// Function to add user location marker on the map
function addUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                showUserLocation(userLocation);
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to show user's location on the map
function showUserLocation(location) {
    if (userMarker) {
        userMarker.setMap(null);
    }

    map.setCenter(location);

    userMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Your Location",
        icon: "user-location-icon.png", // Replace with the URL of a user location icon
    });
}

// Attach event listener to input field
document.getElementById("searchInput").addEventListener("input", handleInputChange);
// Function to handle search button click
function handleSearchButtonClick() {
    const searchInput = document.getElementById("searchInput");
    const filterValue = searchInput.value.trim();
    generateTableAndMap(filterValue);
}

// Attach event listener to search button
document.getElementById("searchBtn").addEventListener("click", handleSearchButtonClick);
// Initial table generation with empty filter value (show all data)
generateTableAndMap("");