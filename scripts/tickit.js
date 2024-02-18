function handlerButton() {
    const select = document.getElementById('seat-select');
    select.scrollIntoView({ behavior: 'smooth' })
}

document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat');
    const seatsCount = document.getElementById('seat-count');
    const availableSeats = document.getElementById('available-seats');
    const SelectedList = document.getElementById('Selected-list');
    const seatPrice = 550;
    let selectedSeats = 0;
    let availableSeat = 16;
    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            if (seat.classList.contains('bg-green-500')) {
                seat.classList.remove('bg-green-500');
                selectedSeats--;
                availableSeat++;
            } else {
                seat.classList.add('bg-green-500');
                selectedSeats++;
                availableSeat--;
            }
            seatsCount.textContent = `${selectedSeats}`;
            availableSeats.textContent = `${availableSeat}`;
            updateSelectedSeatsList()
        })
    })
    function updateSelectedSeatsList() {
        SelectedList.innerHTML = '';
        selectedSeats.forEach(seat => {
            const listItem = document.createElement('li');
            listItem.textContent = `Seat: ${seat} - Economy - Price: $${seatPrice}`;
            SelectedList.appendChild(listItem);
        });
    }
    
})
