// Precios convertidos a CLP basándonos en tu requerimiento (800 CLP la galleta base)
const products = [
    { id: 1, name: 'Classic Choc', price: 800, type: 'unidad', category: 'clasicas', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1499636136210-6f4ce9127154?auto=format&fit=crop&w=400&q=80', desc: 'Receta original con chips de chocolate 70% cacao.' },
    { id: 2, name: 'Velvet Red', price: 900, type: 'unidad', category: 'rellenas', tag: 'Favorito', img: 'https://images.unsplash.com/photo-1618922874844-04e4c66006b6?auto=format&fit=crop&w=400&q=80', desc: 'Suave terciopelo con notas de cacao y chocolate blanco.' },
    { id: 3, name: 'Salted Caramel', price: 950, type: 'unidad', category: 'rellenas', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=400&q=80', desc: 'Caramelo artesanal y un toque de sal marina.' },
    { id: 4, name: 'Caja Dark Chocolate', price: 8600, type: 'docena', category: 'clasicas', tag: 'Oferta', img: 'https://images.unsplash.com/photo-1558961312-50345c041a45?auto=format&fit=crop&w=400&q=80', desc: '12 galletas infundidas con chocolate belga oscuro.' },
    { id: 5, name: 'Pistachio Dream', price: 9200, type: 'docena', category: 'limitada', tag: 'New', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', desc: 'Pistachos tostados con chocolate blanco.' },
    { id: 6, name: 'Red Velvet Lava', price: 9600, type: 'docena', category: 'rellenas', tag: 'Premium', img: 'https://images.unsplash.com/photo-1618922874844-04e4c66006b6?auto=format&fit=crop&w=400&q=80', desc: '12 galletas rellenas de un centro cremoso de queso.' }
];

let cart = [];

// Formateador de moneda CLP
const formatCLP = (num) => {
    return num.toLocaleString('es-CL');
};

function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach(product => {
        grid.innerHTML += `
            <div class="glassmorphism rounded-3xl overflow-hidden shadow-sm hover:shadow-glow transition-all flex flex-col group">
                <div class="relative overflow-hidden aspect-square bg-cream">
                    <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 text-xs font-bold rounded-full text-neonBurgundy z-10 shadow-md uppercase tracking-wider">${product.tag}</span>
                    <img src="${product.img}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                        <div class="flex items-start justify-between">
                            <h3 class="font-brand text-xl font-bold text-darkChocolate">${product.name}</h3>
                            <div class="text-right">
                                <span class="text-xl font-bold text-deepBurgundy block">$${formatCLP(product.price)}</span>
                                <span class="text-[10px] text-darkChocolate/50 uppercase font-bold tracking-wider">x ${product.type}</span>
                            </div>
                        </div>
                        <p class="text-sm text-darkChocolate/70 mt-2">${product.desc}</p>
                    </div>
                    <button onclick="addToCart(${product.id})" class="btn-modern w-full py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
                        <span>Añadir</span>
                    </button>
                </div>
            </div>
        `;
    });
}

// --- LOGICA DEL ROBOT GALLETERO ---
const BASE_PRICE = 800; // 800 CLP por galleta

function calculateRobotPrice() {
    const qtyInput = document.getElementById('robot-qty');
    if(!qtyInput) return;
    let qty = parseInt(qtyInput.value) || 0;
    if(qty < 1) qty = 1;

    let subtotal = qty * BASE_PRICE;
    let discountPercent = 0;
    let msg = "Precio normal aplicado";

    // Lógica de ofertas del Robot
    if (qty >= 12) {
        discountPercent = 0.20; // 20% descuento por 12 o más
        msg = "¡Docena! 20% de descuento";
    } else if (qty >= 6) {
        discountPercent = 0.10; // 10% descuento por 6 o más
        msg = "¡Media docena! 10% de dcto";
    }

    let finalTotal = subtotal - (subtotal * discountPercent);

    document.getElementById('robot-subtotal').innerText = `$${formatCLP(subtotal)} CLP`;
    const msgEl = document.getElementById('robot-msg');
    
    if (discountPercent > 0) {
        document.getElementById('robot-subtotal').classList.remove('hidden');
        msgEl.innerText = msg;
        msgEl.className = "text-sm font-bold text-green-500 animate-pulse";
    } else {
        document.getElementById('robot-subtotal').classList.add('hidden');
        msgEl.innerText = msg;
        msgEl.className = "text-sm text-white/60";
    }

    document.getElementById('robot-total').innerHTML = `$${formatCLP(finalTotal)}`;
    
    // Guardar en el botón para el carrito temporalmente
    const btn = document.getElementById('robot-add-btn');
    btn.dataset.qty = qty;
    btn.dataset.price = finalTotal / qty; // Precio unitario con descuento
}

function addRobotToCart() {
    const btn = document.getElementById('robot-add-btn');
    const qty = parseInt(btn.dataset.qty);
    const unitPrice = parseFloat(btn.dataset.price);

    // Creamos un producto dinámico para el pedido del robot
    const robotProduct = {
        id: 'robot-' + Date.now(),
        name: `Bolsa Personalizada (${qty} uds)`,
        price: unitPrice * qty,
        type: 'bolsa',
        img: 'https://cdn-icons-png.flaticon.com/512/3081/3081162.png', // Icono de bolsa/galleta
        quantity: 1
    };
    
    cart.push(robotProduct);
    updateCart();
    toggleCart();
}

// --- CARRITO DE COMPRAS ---
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('hidden'); }

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exist = cart.find(item => item.id === id);
    if (exist) exist.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    updateCart();
    document.getElementById('cart-sidebar').classList.remove('hidden');
}

function changeQty(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
    }
    updateCart();
}

function updateCart() {
    const container = document.getElementById('cart-items-container');
    const countBadge = document.getElementById('cart-count');
    const emptyMsg = document.getElementById('empty-cart-msg');
    
    if (!container) return;
    container.innerHTML = '';
    let totalItems = 0, subtotal = 0;

    if (cart.length === 0) {
        if (emptyMsg) { container.appendChild(emptyMsg); emptyMsg.classList.remove('hidden'); }
        document.getElementById('checkout-btn').disabled = true;
        document.getElementById('checkout-btn').classList.add('opacity-50');
        if (countBadge) countBadge.classList.add('hidden');
    } else {
        if (emptyMsg) emptyMsg.classList.add('hidden');
        document.getElementById('checkout-btn').disabled = false;
        document.getElementById('checkout-btn').classList.remove('opacity-50');
        if (countBadge) countBadge.classList.remove('hidden');

        cart.forEach(item => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;
            container.innerHTML += `
                <div class="flex items-center space-x-4 glassmorphism p-3 rounded-2xl">
                    <img src="${item.img}" class="w-16 h-16 object-cover rounded-xl border border-white/50">
                    <div class="flex-1">
                        <h4 class="font-brand text-sm font-bold text-darkChocolate">${item.name}</h4>
                        <span class="text-xs text-darkChocolate/60">$${formatCLP(item.price)} / ${item.type}</span>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="changeQty(${item.id || `'${item.id}'`}, -1)" class="w-6 h-6 bg-white rounded-full text-xs font-bold shadow-sm">-</button>
                            <span class="text-sm font-semibold">${item.quantity}</span>
                            <button onclick="changeQty(${item.id || `'${item.id}'`}, 1)" class="w-6 h-6 bg-white rounded-full text-xs font-bold shadow-sm">+</button>
                        </div>
                    </div>
                    <span class="text-sm font-bold text-deepBurgundy">$${formatCLP(item.price * item.quantity)}</span>
                </div>`;
        });
    }
    if (countBadge) countBadge.innerText = totalItems;
    document.getElementById('cart-subtotal').innerText = `$${formatCLP(subtotal)} CLP`;
    document.getElementById('modal-total-amount').innerText = `$${formatCLP(subtotal)} CLP`;
}

// --- MODAL DE PAGO ---
function openCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('hidden');
    document.getElementById('payment-form').classList.remove('hidden');
    document.getElementById('payment-success').classList.add('hidden');
}

function closeCheckoutModal(clearCart = false) {
    document.getElementById('checkout-modal').classList.add('hidden');
    if (clearCart) { cart = []; updateCart(); toggleCart(); }
}

function processPayment(e) {
    e.preventDefault();
    document.getElementById('pay-btn-text').innerText = 'Validando Transacción...';
    document.getElementById('pay-spinner').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('pay-btn-text').innerText = 'Confirmar Pago Seguro';
        document.getElementById('pay-spinner').classList.add('hidden');
        document.getElementById('payment-form').classList.add('hidden');
        document.getElementById('payment-success').classList.remove('hidden');
    }, 2500);
}

function filterProducts(cat) {
    renderProducts(cat);
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.replace('btn-modern', 'glassmorphism'));
    event.currentTarget.classList.replace('glassmorphism', 'btn-modern');
}

window.onload = () => { 
    renderProducts('all'); 
    calculateRobotPrice(); // Inicializa el robot
};