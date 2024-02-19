function handlerButton() {
    const select = document.getElementById('seat-select');
    select.scrollIntoView({ behavior: 'smooth' })
}


document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat');
    const seatCount = document.getElementById('seat-count');
    const totalPrice = document.getElementById('total-price');
    const selectedSeatsList = document.getElementById('Selected-list');
    const availableSeats = document.getElementById('available-seats');
    const couponInput = document.getElementById('coupon-input');
    const applyCouponBtn = document.getElementById('apply-coupon');
    const grandTotalPrice = document.getElementById('grand-total');
    const inputFields = document.querySelectorAll('.customer-info');
    const submitBtn = document.getElementById('submit-btn');
    const successComponent = document.getElementById('success-message');
    const select = document.getElementById('seat-select');
    const buyContinue = document.getElementById('continue');
    const coupon = document.getElementById('coupon');
    const discountPrice = document.getElementById('discount-price');
    const discountElement = document.getElementById('discount-element');
    let selectedSeats = [];
    let selectedSeat = 0;
    let total = 0;
    let availableSeat = 16;
    const maxSeatsAllowed = 4;
    const seatPrice = 550;
    let couponApplied = false;

    const seatNames = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'];

    function seatClickHandler() {
        const seat = this;
        if (availableSeat) {
            if (selectedSeats.length < maxSeatsAllowed) {
                seat.classList.add('bg-green-500');
                const seatName = seat.textContent.trim();
                selectedSeats.push(seatName);
                selectedSeat++;
                availableSeat--;
                submitBtn.removeAttribute('disabled');
                seat.removeEventListener('click', seatClickHandler);
                updateSelectedSeatsList(seatName);
            } else {
                alert("You can only select up to 4 seats.");
            }
            seatCount.textContent = `${selectedSeat}`;
            availableSeats.textContent = `${availableSeat}`;
            updateTotalPrice();
        }
    }

    function updateSelectedSeatsList(seatName) {
        const divWrapper = document.createElement('div');
        divWrapper.style.display = 'flex';
        divWrapper.style.justifyContent = 'space-between';

        const seatElement = document.createElement('span');
        seatElement.textContent = seatName;

        const typeElement = document.createElement('span');
        typeElement.textContent = 'Economy';

        const priceElement = document.createElement('span');
        priceElement.textContent = `${seatPrice}`;

        divWrapper.appendChild(seatElement);
        divWrapper.appendChild(typeElement);
        divWrapper.appendChild(priceElement);

        selectedSeatsList.appendChild(divWrapper);
    }

    seats.forEach((seat, index) => {
        seat.textContent = seatNames[index];
        seat.addEventListener('click', seatClickHandler);
    });

    function updateTotalPrice() {
        const couponCode = couponInput.value.trim();
        if (couponApplied && couponCode === 'NEW15') {
            discountTotal = (selectedSeats.length * seatPrice) * 0.85;
            grandTotalPrice.textContent = `BDT: ${discountTotal}`;
        }
        else if (couponApplied && couponCode === 'Couple 20') {
            discountTotal = (selectedSeats.length * seatPrice) * 0.8;
            grandTotalPrice.textContent = `BDT: ${discountTotal}`;
        } else {
            total = selectedSeats.length * seatPrice;
        }
        const discount= total- discountTotal;
        discountPrice.textContent= `BDT: ${discount}`;
        totalPrice.textContent = `BDT: ${total}`;
    }

    applyCouponBtn.addEventListener('click', function () {
        const couponCode = couponInput.value.trim();
        if (selectedSeats.length === 4) {
            if (couponCode === 'NEW15' || couponCode === 'Couple 20') {
                couponApplied = true;
                updateTotalPrice();
                coupon.style.display = 'none';
                discountElement.removeAttribute('class','hidden');
                discountElement.setAttribute('class','flex justify-between');
            } else {
                alert("Invalid coupon code.");
            }
        }
        else {
            alert('You need to select at least 4 seats!');
        }

    });


    submitBtn.addEventListener('click', function () {
        let allFieldsFilled = true;
        inputFields.forEach(field => {
            if (field.value.trim() === '') {
                allFieldsFilled = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (allFieldsFilled) {
            successComponent.classList.remove('hidden');
            select.style.display = 'none';
        } else {
            alert("Please fill out all required fields.");
        }
    });

    buyContinue.addEventListener('click', function () {
        successComponent.classList.add('hidden');
        select.style.display = 'block';
    })
});