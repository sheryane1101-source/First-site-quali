// ===========================
// ANIMATION INTRO
// ===========================
window.addEventListener('load', () => {
  setTimeout(() => {
    const intro = document.getElementById('intro');
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
    }, 1000); // attendre la transition
  }, 2500); // durée de l'animation
});

// ===========================
// DONNÉES PRODUITS
// ===========================
const products = [];

// Générer 35 produits fictifs
for (let i = 1; i <= 35; i++) {
  let category = i % 3 === 1 ? 'caftan' : i % 3 === 2 ? 'voile' : 'vetement';
  products.push({
    id: i,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} ${i}`,
    price: (Math.floor(Math.random() * 190) + 10), // Prix entre 10 et 200€
    category: category,
    images: [
      `https://picsum.photos/seed/${i}a/400/500`,
      `https://picsum.photos/seed/${i}b/400/500`
    ]
  });
}

// ===========================
// VARIABLES GLOBALES
// ===========================
let favorites = [];
let cart = [];

// ===========================
// AFFICHER LES PRODUITS
// ===========================
const productsContainer = document.getElementById('products-container');

function displayProducts(filterCategory = 'all', maxPrice = 200) {
  productsContainer.innerHTML = '';
  products
    .filter(p => (filterCategory === 'all' ? true : p.category === filterCategory) && p.price <= maxPrice)
    .forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      productCard.innerHTML = `
        <div class="product-slider">
          <img src="${product.images[0]}" class="active">
          <img src="${product.images[1]}">
        </div>
        <div class="fav-btn">❤</div>
        <h3>${product.name}</h3>
        <p>${product.price}€</p>
        <button>Add to Cart</button>
      `;

      // Hover image slider
      const sliderImages = productCard.querySelectorAll('.product-slider img');
      productCard.addEventListener('mouseenter', () => {
        sliderImages[0].classList.remove('active');
        sliderImages[1].classList.add('active');
      });
      productCard.addEventListener('mouseleave', () => {
        sliderImages[1].classList.remove('active');
        sliderImages[0].classList.add('active');
      });

      // Ajouter aux favoris
      const favBtn = productCard.querySelector('.fav-btn');
      favBtn.addEventListener('click', () => {
        if (!favorites.includes(product.id)) {
          favorites.push(product.id);
        } else {
          favorites = favorites.filter(id => id !== product.id);
        }
        document.getElementById('fav-count').textContent = `❤ ${favorites.length}`;
      });

      // Ajouter au panier
      const addToCartBtn = productCard.querySelector('button');
      addToCartBtn.addEventListener('click', () => {
        cart.push(product);
        document.getElementById('cart-count').textContent = `🛒 ${cart.length}`;
      });

      productsContainer.appendChild(productCard);
    });
}

// Affichage initial
displayProducts();

// ===========================
// FILTRES
// ===========================
const filterCategory = document.getElementById('filter-category');
const filterPrice = document.getElementById('filter-price');
const priceValue = document.getElementById('price-value');

filterCategory.addEventListener('change', () => {
  displayProducts(filterCategory.value, filterPrice.value);
});

filterPrice.addEventListener('input', () => {
  priceValue.textContent = filterPrice.value;
  displayProducts(filterCategory.value, filterPrice.value);
});

// ===========================
// MODAL PANIER
// ===========================
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout');
const closeModal = document.querySelector('.close');

// Ouvrir modal au clic sur panier
document.getElementById('cart-count').addEventListener('click', () => {
  cartModal.style.display = 'flex';
  renderCart();
});

// Fermer modal
closeModal.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Fermer modal si clic en dehors
window.addEventListener('click', e => {
  if (e.target === cartModal) cartModal.style.display = 'none';
});

// Afficher items du panier
function renderCart() {
  cartItemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.textContent = `${item.name} - ${item.price}€`;
    cartItemsContainer.appendChild(div);
  });
}

// Checkout
checkoutBtn.addEventListener('click', () => {
  alert('VERSION BETA ! Paiement non disponible pour le moment.');
});
