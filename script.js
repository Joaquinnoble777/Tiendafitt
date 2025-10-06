const products = [
  { id: 1, name: "Proteína Whey Gold Standard", price: 2400, img: "https://http2.mlstatic.com/D_NQ_NP_964621-MLU74087768602_012024-O.webp" },
  { id: 2, name: "Creatina Micronizada Universal", price: 1800, img: "https://http2.mlstatic.com/D_NQ_NP_694355-MLA92545342446_092025-O.webp" },
  { id: 3, name: "Pre-entreno C4 Original", price: 2100, img: "https://http2.mlstatic.com/D_NQ_NP_880231-MLU73165704475_112023-O.webp" },
  { id: 4, name: "Shaker Pro 700ml", price: 350, img: "https://http2.mlstatic.com/D_NQ_NP_653781-MLA92708354393_092025-O.webp" },
  { id: 5, name: "BCAA 2:1:1", price: 1600, img: "https://http2.mlstatic.com/D_NQ_NP_709198-MLA84836665415_052025-O.webp" },
  { id: 6, name: "Proteína Vegetal Vegan Pro", price: 2200, img: "https://http2.mlstatic.com/D_NQ_NP_666732-MLU75594758093_042024-O.webp" },
  { id: 7, name: "Guantes de Entrenamiento", price: 750, img: "https://http2.mlstatic.com/D_NQ_NP_960756-MLA92594969161_092025-O.webp" },
  { id: 8, name: "Omega 3 - 100 cápsulas", price: 950, img: "https://http2.mlstatic.com/D_NQ_NP_846955-MLU75593655579_042024-O.webp" },
  { id: 9, name: "Multivitamínico Opti-Men", price: 1400, img: "https://http2.mlstatic.com/D_NQ_NP_2X_661236-MLU93789929908_102025-F.webp" },
  { id: 10, name: "Cinturón de Entrenamiento", price: 1300, img: "https://http2.mlstatic.com/D_NQ_NP_736896-MLU89099097568_082025-O.webp" },

  // Shakers
  { id: 11, name: "Shaker Pro 700ml", price: 350, img: "https://http2.mlstatic.com/D_NQ_NP_653781-MLA92708354393_092025-O.webp" },
  { id: 12, name: "Shaker Gym 500ml", price: 280, img: "https://http2.mlstatic.com/D_NQ_NP_850625-MLU53015750959_122022-O.webp" },
  { id: 13, name: "Shaker Sport 600ml", price: 310, img: "https://http2.mlstatic.com/D_NQ_NP_972536-MLU79253845193_092024-O.webp" },
  { id: 14, name: "Shaker Fitness 700ml", price: 350, img: "https://http2.mlstatic.com/D_NQ_NP_996812-MLU92153342457_092025-O.webp" }
];

  let cart = [];

  function renderProducts(list = products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    list.forEach(p => {
      container.innerHTML += `
        <div class="col-md-4 col-lg-3">
          <div class="card h-100 text-center">
            <img src="${p.img}" class="card-img-top" loading="lazy" alt="${p.name}">
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text fw-bold">$${p.price}</p>
              <button class="btn btn-primary w-100" onclick="addToCart(${p.id})">
                <i class="fa-solid fa-cart-plus me-2"></i>Agregar
              </button>
            </div>
          </div>
        </div>`;
    });
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
  }

  function changeQuantity(id, delta) {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) removeFromCart(id);
    renderCart();
  }

  function renderCart() {
    const itemsContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    let total = 0, count = 0;

    itemsContainer.innerHTML = "";

    if (cart.length === 0) {
      itemsContainer.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
      totalContainer.textContent = "0";
      cartCount.textContent = "0";
      return;
    }

    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      count += item.quantity;
      itemsContainer.innerHTML += `
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <div><strong>${item.name}</strong><br><small>$${item.price} c/u</small></div>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-1" onclick="changeQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary ms-1" onclick="changeQuantity(${item.id}, 1)">+</button>
            <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCart(${item.id})"><i class="fa fa-trash"></i></button>
          </div>
        </div>`;
    });

    totalContainer.textContent = total;
    cartCount.textContent = count;
  }

  function checkout() {
    if (cart.length === 0) return alert("Tu carrito está vacío.");
    let message = "🛒 Pedido Fitness Store:%0A";
    let total = 0;
    cart.forEach(item => {
      message += `${item.name} x${item.quantity} - $${item.price * item.quantity}%0A`;
      total += item.price * item.quantity;
    });
    message += `%0ATotal: $${total}`;
    const url = `https://wa.me/59899946914?text=${message}`;
    window.open(url, "_blank");
  }

  document.getElementById("search").addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  });

  renderProducts();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

