function handlerButton(){
    const select= document.getElementById('seat-select');
    select.scrollIntoView({behavior:'smooth'})
}

//  coupon input ---
const couponButton= document.getElementById('coupon-button');
couponButton.addEventListener('click', function(){
    let couponInput= document.getElementById('coupon-input').value.toUpperCase();

    if(couponInput==='NEW15' || couponInput=== 'Couple 20'){
        document.getElementById(couponInput).classList.add('hidden');
        couponButton.classList.add('hidden');
    }
    else{
        alart('Incorret coupon code');
    }
})