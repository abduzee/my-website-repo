document.getElementById('add-room-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const roomNumber = document.getElementById('roomNumber').value;
    const roomType = document.getElementById('roomType').value;
    const pricePerNight = document.getElementById('pricePerNight').value;

    // Send the room data to the server
    fetch('/api/add-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            roomNumber,
            roomType,
            pricePerNight
        })
    })
    .then(response => response.json())
    .then(data => {
        const message = document.getElementById('message');
        if (data.success) {
            message.textContent = 'Room added successfully!';
            message.style.color = 'green';
        } else {
            message.textContent = 'Error adding room.';
            message.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
