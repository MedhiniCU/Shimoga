const shimogaLat = 13.9316;
const shimogaLng = 75.5586;

async function searchPlace() {
    const placeName = document.getElementById("placeInput").value;
    if (placeName.trim() === "") {
        alert("Please enter a place name!");
        return;
    }

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&location=${shimogaLat},${shimogaLng}&radius=5000&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
            let placesList = data.results.map(place => {
                return `
                    <div class="place">
                        <h3>${place.name}</h3>
                        <p><strong>Address:</strong> ${place.formatted_address}</p>
                        <p><strong>Rating:</strong> ${place.rating || "No Rating"}</p>
                        <img src="${place.icon}" alt="Place Icon">
                    </div>
                `;
            }).join("");
            
            document.getElementById("placeContainer").innerHTML = placesList;
        } else {
            document.getElementById("placeContainer").innerHTML = "<p>No places found!</p>";
        }
    } catch (error) {
        console.error("Error fetching places:", error);
        document.getElementById("placeContainer").innerHTML = "<p>Error fetching places. Try again later.</p>";
    }
}
