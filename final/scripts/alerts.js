async function getAlerts() {
    for (let i = 1; i < 4; i++) {
        
        try {
            const response = await fetch(`http://18.221.184.231/api/v1/Locations/${i}/barrel-details`);
            if (!response.ok) throw new Error(`Error! Status:${response.status}`)
            
            const data = await response.json();
            addAlert(data);
        } catch (error) {
            console.error(error.message);
        }
        
    }
}

function addAlert(data) {

    // Extract location name
    const locationName = data.locationName;

    // Flatten all active alerts from all barrels into one array
    const allAlerts = data.barrels
    .filter(barrel => barrel.activeAlerts.length > 0) // only barrels with alerts
    .map(barrel => {
        return barrel.activeAlerts.map(alert => ({
            location: locationName,
            barrelId: barrel.barrelId,
            barrelType: barrel.barrelType,
            alertId: alert.alertId,
            alertType: alert.alertType,
            alertMessage: alert.alertMessage,
            createdAt: alert.createdAt
        }));
    })
    .flat(); // flatten nested arrays

    //loop through allAlerts to build HTML
    const tableBody = document.querySelector('#alertTable tbody');

    allAlerts.forEach(alert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="images/alert.svg" alt="priority level" width = 50 loading="lazy"></td>
            <td>${alert.barrelType}</td>
            <td>"${alert.barrelId}: ${alert.alertMessage}"</td>
            <td>${locationName}</td>
            <td>${new Date(alert.createdAt).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

getAlerts();
