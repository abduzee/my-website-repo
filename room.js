document.addEventListener('DOMContentLoaded', () => {
    const roomSelect = document.getElementById('room');
    const bookingMessage = document.getElementById('booking-message');

    // Fetch available rooms when the page loads
    fetch('/api/rooms')
        .then((response) => response.json())
        .then((rooms) => {
            rooms.forEach((room) => {
                const option = document.createElement('option');
                option.value = room.id;
                option.textContent = `Room ${room.room_number} - ${room.room_type} - $${room.price_per_night}/night`;
                roomSelect.appendChild(option);
            });
        });

    // Handle booking form submission
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const roomId = roomSelect.value;
        const checkInDate = document.getElementById('checkIn').value;
        const checkOutDate = document.getElementById('checkOut').value;

        if (!roomId || !checkInDate || !checkOutDate) {
            bookingMessage.textContent = 'Please fill out all fields.';
            bookingMessage.style.color = 'red';
            return;
        }

        const userId = 1; // Replace with actual logged-in user ID

        // Send reservation data to the server
        fetch('/api/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, roomId, checkInDate, checkOutDate }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    bookingMessage.textContent = `${data.message} Total Price: $${data.totalPrice}`;
                    bookingMessage.style.color = 'green';
                } else {
                    bookingMessage.textContent = 'Something went wrong. Please try again.';
                    bookingMessage.style.color = 'red';
                }
            })
            .catch((error) => {
                bookingMessage.textContent = 'Error submitting reservation.';
                bookingMessage.style.color = 'red';
            });
    });
});
