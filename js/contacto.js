async function initMap() {
    const map = new google.maps.Map(
        document.getElementById("map"), {
            zoom: 6,
            center: { lat: 39.9050239, lng: -5.0401548 }
        });
    
    const directionsService = new google.maps.DirectionsService(); // Realiza el calculo de la ruta
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
        panel: document.getElementById("panel"),
        suppressMarkers: true
    });

    let empresa = new google.maps.LatLng(40.905955, -3.738886);

    try {
        const ubicacionCliente = await obtenerUbicacionUsuario();
        displayRoute(ubicacionCliente, empresa, directionsService, directionsRenderer);
    } catch (error) {
        alert("Error al obtener la ubicación: " + error.message);
        let ubicacionCliente = new google.maps.LatLng(40.327913, -3.857387); // Ubicación predeterminada
        displayRoute(ubicacionCliente, empresa, directionsService, directionsRenderer);
    }
}

async function obtenerUbicacionUsuario() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let ubicacionCliente = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    resolve(ubicacionCliente);
                },
                (error) => reject(error)
            );
        } else {
            reject(new Error("La geolocalización no está soportada por este navegador."));
        }
    });
}

async function displayRoute(origin, destination, service, display) {
    try {
        const result = await service.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true
        }).then();
        display.setDirections(result);
    } catch (e) {
        alert("Error al calcular la ruta: " + e.message);
    }
}

window.initMap = initMap;
