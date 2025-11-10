// ----- Cart Counter & Floating Badge -----
let cartCount = 0;

// Create floating badge
const cartIcon = document.querySelector('.nav-cart');
const badge = document.createElement('span');
badge.style.cssText = `
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 7px;
  font-size: 0.7rem;
  position: absolute;
  top: 5px;
  right: 5px;
`;
badge.textContent = cartCount;
cartIcon.style.position = 'relative';
cartIcon.appendChild(badge);

// Update cart badge
function updateCart() {
    badge.textContent = cartCount;
    cartIcon.textContent = ` Cart (${cartCount})`;
    cartIcon.appendChild(badge); // keep badge visible
}

// ----- Add to Cart from "See more" -----
const seeMoreBtns = document.querySelectorAll('.box-content p');

seeMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        alert(`Product added to cart! Total items: ${cartCount}`);
        updateCart();
    });
});

// ----- Search Filter -----
const searchInput = document.querySelector('.search-input');
const boxes = document.querySelectorAll('.box-content');

searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase();
    boxes.forEach(box => {
        const title = box.querySelector('h2').textContent.toLowerCase();
        box.parentElement.style.display = title.includes(query) ? 'block' : 'none';
    });
});

// ----- Product Modal -----
const body = document.body;

// Create modal elements
const modal = document.createElement('div');
modal.style.cssText = `
  position: fixed;
  top:0; left:0;
  width:100%; height:100%;
  background: rgba(0,0,0,0.6);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContent = document.createElement('div');
modalContent.style.cssText = `
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
`;

const modalClose = document.createElement('span');
modalClose.textContent = '✖';
modalClose.style.cssText = `
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 1.2rem;
`;

modalContent.appendChild(modalClose);
modal.appendChild(modalContent);
body.appendChild(modal);

// Function to open modal
boxes.forEach(box => {
    box.addEventListener('click', () => {
        const title = box.querySelector('h2').textContent;
        const img = box.querySelector('.box-img').style.backgroundImage;

        modalContent.innerHTML = `
            <span style="position:absolute; top:10px; right:15px; cursor:pointer; font-size:1.2rem;">✖</span>
            <h2>${title}</h2>
            <div style="background-image: ${img}; height: 250px; background-size: cover; margin: 15px 0;"></div>
            <button style="padding: 10px 15px; background:#febd68; border:none; cursor:pointer;">Add to Cart</button>
        `;
        modal.style.display = 'flex';

        // Add to cart button inside modal
        modalContent.querySelector('button').addEventListener('click', () => {
            cartCount++;
            alert(`Product added to cart! Total items: ${cartCount}`);
            updateCart();
        });

        // Close button inside modal
        modalContent.querySelector('span').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });
});

// Close modal when clicking outside content
modal.addEventListener('click', e => {
    if(e.target === modal) modal.style.display = 'none';
});
