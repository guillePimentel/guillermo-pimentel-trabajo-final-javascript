document.addEventListener('DOMContentLoaded', function() {
    // Ruta al archivo JSON
    fetch('activities.json')
        .then(response => response.json())
        .then(data => {
            const activityList = document.getElementById('activity-list');

            data.forEach(activity => {
                const listItem = document.createElement('li');
                listItem.textContent = `${activity.nombre} - Fecha: ${activity.fecha} - Ubicación: ${activity.ubicacion}`;
                activityList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
