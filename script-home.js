// Carousel
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    // Ensure the index is within bounds (circular navigation)
    currentSlide = (index + totalSlides) % totalSlides;

    // Update the carousel position
    const carousel = document.querySelector('.carousel-container');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Add event listeners for navigation buttons
document.getElementById('prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('next').addEventListener('click', () => showSlide(currentSlide + 1));

// Auto-slide every 5 seconds (optional)
setInterval(() => showSlide(currentSlide + 1), 5000);


// Fetch and Display Rooms
fetch('/api/rooms')
    .then((response) => response.json())
    .then((data) => {
        const roomCards = document.getElementById('roomCards');
        roomCards.innerHTML = '';

        if (data.length === 0) {
            roomCards.innerHTML = '<p>No rooms available at the moment.</p>';
            return;
        }

        data.forEach((room) => {
            const card = document.createElement('div');
            card.classList.add('room-card');
            card.innerHTML = `
                <img src="images/room${room.id}.jpg" alt="${room.room_type}">
                <h3>Room ${room.room_number}</h3>
                <p>Type: ${room.room_type}</p>
                <p>Price: $${room.price_per_night}/night</p>
                <button onclick="reserveRoom(${room.id})">Reserve</button>
            `;
            roomCards.appendChild(card);
        });
    });

function reserveRoom(roomId) {
    const checkInDate = prompt('Enter check-in date (YYYY-MM-DD):');
    const checkOutDate = prompt('Enter check-out date (YYYY-MM-DD):');

    fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, checkInDate, checkOutDate }),
    })
        .then((response) => response.json())
        .then((data) => alert(data.message))
        .catch((err) => console.error('Error reserving room:', err));
}



