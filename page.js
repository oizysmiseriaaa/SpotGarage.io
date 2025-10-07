let cart = [];
let total = 0;

document.querySelectorAll('.quantity-controls').forEach(controls => {
    const minusBtn = controls.querySelector('.minus');
    const plusBtn = controls.querySelector('.plus');
    const input = controls.querySelector('.qty-input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(input.value);
        if (value < 99) {
            input.value = value + 1;
        }
    });

    input.addEventListener('change', () => {
        let value = parseInt(input.value);
        if (value < 1) input.value = 1;
        if (value > 99) input.value = 99;
    });
});

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.menu-card');
        const itemName = card.querySelector('h4').textContent;
        const price = parseFloat(this.dataset.price);
        const quantity = parseInt(card.querySelector('.qty-input').value);

        for (let i = 0; i < quantity; i++) {
            cart.push({ name: itemName, price: price });
        }
        total += price * quantity;
      
        document.getElementById('total').textContent = `₱${total.toFixed(2)}`;
  
        this.innerHTML = `<i class="fas fa-check"></i> Added ${quantity}`;
        this.style.background = '#28a745';
        
        setTimeout(() => {
            this.innerHTML = '<span class="btn-text">Add to Order</span><i class="fas fa-plus"></i>';
            this.style.background = '';
            card.querySelector('.qty-input').value = 1; 
        }, 1000);
    });
});


function calculate() {
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const payment = parseFloat(document.getElementById('payment').value) || 0;
    const finalTotal = total - discount;
    const change = payment - finalTotal;

    if (payment < finalTotal) {
        alert('Insufficient payment amount!');
        return;
    }

    document.getElementById('change').textContent = `₱${change.toFixed(2)}`;
}


document.querySelector('.main-text .btn').addEventListener('click', function() {

    document.querySelector('#menu').scrollIntoView({ 
        behavior: 'smooth'
    });
});

const openBtn = document.getElementById('open-btn');
const nav = document.getElementById('nav');

openBtn.addEventListener('click', () => {
    nav.classList.toggle('open-menu');
});

function clearOrder() {
    cart = [];
    total = 0;
    document.getElementById('total').textContent = '₱0.00';
    document.getElementById('discount').value = '0';
    document.getElementById('payment').value = '0';
    document.getElementById('change').textContent = '₱0.00';
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.innerHTML = '<span class="btn-text">Add to Order</span><i class="fas fa-plus"></i>';
        button.style.background = '';
    });
}

const summaryContainer = document.querySelector('.summary-container');
const buttonsDiv = document.createElement('div');
buttonsDiv.className = 'summary-buttons';

const calculateBtn = document.createElement('button');
calculateBtn.className = 'btn';
calculateBtn.textContent = 'Calculate Total';
calculateBtn.onclick = calculate;

const viewOrderBtn = document.createElement('button');
viewOrderBtn.className = 'btn';
viewOrderBtn.textContent = 'View Order';
viewOrderBtn.onclick = showOrderSummary;

const clearBtn = document.createElement('button');
clearBtn.className = 'btn';
clearBtn.textContent = 'Clear Order';
clearBtn.onclick = clearOrder;


buttonsDiv.appendChild(viewOrderBtn);
buttonsDiv.appendChild(calculateBtn);
buttonsDiv.appendChild(clearBtn);

summaryContainer.appendChild(buttonsDiv);

function showOrderSummary() {
    if (cart.length === 0) {
        alert('Please add items to your order first!');
        return;
    }

    let summary = 'Order Summary:\n\n';
    const itemCounts = {};

    cart.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    });

    for (const [name, count] of Object.entries(itemCounts)) {
        const item = cart.find(i => i.name === name);
        summary += `${name} x${count}: ₱${(item.price * count).toFixed(2)}\n`;
    }

    summary += `\nTotal: ₱${total.toFixed(2)}`;
    alert(summary);
}

const searchBtn = document.getElementById("search-btn");
const searchInput = document.querySelector(".search_inp");

searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("open-search_inp");
});

// Review Form Handling
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewName').value;
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('reviewText').value;
    
    // Create new review card
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
        <div class="quote-icon">
            <i class="fas fa-quote-left"></i>
        </div>
        <div class="stars">
            ${Array(parseInt(rating)).fill('<i class="fas fa-star"></i>').join('')}
            ${Array(5 - parseInt(rating)).fill('<i class="far fa-star"></i>').join('')}
        </div>
        <p class="review-text">"${review}"</p>
        <h4 class="reviewer-name">${name}</h4>
    `;
    
    // Add animation class
    reviewCard.style.animation = 'fadeInUp 0.8s ease-out';
    
    // Add the new review to the reviews container
    document.querySelector('.reviews-container').appendChild(reviewCard);
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('Thank you for your review!');
});