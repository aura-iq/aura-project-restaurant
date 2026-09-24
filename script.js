// ===== أورا — JavaScript =====

// 1. Navbar Toggle (للجوال)
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });

  // إغلاق عند الضغط خارج القائمة
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });

  // إغلاق عند اختيار رابط
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
    });
  });
}

// 2. Cart System
const cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartFooter = document.getElementById('cart-footer');

function openCart() {
  if (cartSidebar) cartSidebar.classList.add('active');
  if (cartOverlay) cartOverlay.classList.add('active');
}

function closeCart() {
  if (cartSidebar) cartSidebar.classList.remove('active');
  if (cartOverlay) cartOverlay.classList.remove('active');
}

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

function formatPrice(n) {
  return n.toLocaleString('en-US') + ' د.ع';
}

function renderCart() {
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>سلة الطلبات فارغة</p><span>أضف أطباقك المفضلة</span></div>';
    if (cartFooter) cartFooter.style.display = 'none';
    if (cartCount) cartCount.textContent = '0';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach(function (item, i) {
    total += item.price * item.qty;
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 0;border-bottom:1px solid var(--gray-200)">';
    html += '<div><strong style="color:var(--gray-900)">' + item.name + '</strong>';
    html += '<div style="color:var(--gray-500);font-size:0.85rem">' + formatPrice(item.price) + ' × ' + item.qty + '</div></div>';
    html += '<div style="display:flex;align-items:center;gap:0.5rem">';
    html += '<button onclick="changeQty(' + i + ', -1)" style="width:30px;height:30px;border-radius:50%;background:var(--gray-200)">−</button>';
    html += '<span style="min-width:20px;text-align:center;font-weight:700">' + item.qty + '</span>';
    html += '<button onclick="changeQty(' + i + ', 1)" style="width:30px;height:30px;border-radius:50%;background:var(--primary);color:#fff">+</button>';
    html += '<button onclick="removeItem(' + i + ')" style="color:#C23B22;margin-right:0.5rem"><i class="fas fa-trash"></i></button>';
    html += '</div></div>';
  });

  cartItems.innerHTML = html;
  if (cartFooter) cartFooter.style.display = 'block';
  if (cartTotal) cartTotal.textContent = formatPrice(total);
  if (cartCount) cartCount.textContent = cart.reduce(function (s, i) { return s + i.qty; }, 0);
}

window.changeQty = function (index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
};

window.removeItem = function (index) {
  cart.splice(index, 1);
  renderCart();
};

// 3. Add to Cart Buttons
document.querySelectorAll('.dish-add').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const name = btn.dataset.dish || 'طبق';
    const price = parseInt(btn.dataset.price) || 0;

    const existing = cart.find(function (i) { return i.name === name; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }

    renderCart();
    openCart();
  });
});

// 4. Delivery Search (تجريبي)
const searchBtn = document.getElementById('search-btn');
const deliveryInput = document.getElementById('delivery-input');

if (searchBtn && deliveryInput) {
  searchBtn.addEventListener('click', function () {
    const value = deliveryInput.value.trim();
    if (!value) {
      alert('أدخل عنوان التوصيل أولاً');
      return;
    }
    alert('سيتم التوصيل إلى: ' + value + '\n(تجريبي)');
  });

  deliveryInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchBtn.click();
    }
  });
}

// 5. Checkout (تجريبي)
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function () {
    if (cart.length === 0) return;
    alert('تم استلام طلبك! سيتم التواصل معك قريباً.');
    cart.length = 0;
    renderCart();
    closeCart();
  });
}

console.log('✅ أورا — سكربت جاهز');
