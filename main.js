// Listado de Productos Oficiales extraídos de SweetBite
const products = [
    { id: 1, name: 'Classic Choc', price: 3.50, type: 'unidad', category: 'clasicas', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1499636136210-6f4ce9127154?auto=format&fit=crop&w=400&q=80', desc: 'Nuestra receta original con chips de chocolate 70% cacao.' },
    { id: 2, name: 'Velvet Red', price: 3.75, type: 'unidad', category: 'rellenas', tag: 'Favorito', img: 'https://images.unsplash.com/photo-1618922874844-04e4c66006b6?auto=format&fit=crop&w=400&q=80', desc: 'Suave como el terciopelo con notas de cacao y chocolate blanco.' },
    { id: 3, name: 'Salted Caramel', price: 3.95, type: 'unidad', category: 'rellenas', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=400&q=80', desc: 'Caramelo artesanal y un toque de sal marina de la costa.' },
    { id: 4, name: 'Sea Salt Dark Chocolate', price: 32.00, type: 'docena', category: 'clasicas', tag: 'Top Seller', img: 'https://images.unsplash.com/photo-1558961312-50345c041a45?auto=format&fit=crop&w=400&q=80', desc: 'Masa clásica infundida con trozos de chocolate belga al 70% y sal de Malton.' },
    { id: 5, name: 'Pistachio Dream', price: 36.00, type: 'docena', category: 'limitada', tag: 'New Arrival', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', desc: 'Pistachos iraníes tostados emparejados con chocolate blanco aterciopelado.' },
    { id: 6, name: 'Red Velvet Lava', price: 38.00, type: 'docena', category: 'rellenas', tag: 'Rellenas', img: 'https://images.unsplash.com/photo-1618922874844-04e4c66006b6?auto=format&fit=crop&w=400&q=80', desc: 'Masa de terciopelo rojo rellena de un centro cremoso de queso crema.' },
    { id: 7, name: 'Midnight Cocoa', price: 34.00, type: 'docena', category: 'veganas', tag: 'Vegan Choice', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80', desc: 'Perfección basada en plantas. Base de cacao doble con chips veganos.' },
    { id: 8, name: 'Summer Lemon Glaze', price: 30.00, type: 'docena', category: 'limitada', tag: 'Limited Edition', img: 'https://images.unsplash.com/photo-1532117182044-2300b1965f97?auto=format&fit=crop&w=400&q=80', desc: 'Masa quebrada de limón siciliano terminada con un glaseado cítrico crujiente.' },
    { id: 9, name: 'Spiced Oatmeal Raisin', price: 28.00, type: 'docena', category: 'clasicas', tag: 'Clásicas', img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80', desc: 'Avena enrollada a la antigua, pasas gigantes y una mezcla de especias.' }
];

let cart = [];

// Renderizar las tarjetas de productos en el Grid HTML
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach(product => {
        grid.innerHTML += `
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-darkChocolate/5 flex flex-col group">
                <div class="relative overflow-hidden aspect-square bg-cream">
                    <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-bold rounded-full text-deepBurgundy z-10 shadow-xs">${product.tag}</span>
                    <img src="${product.img}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                        <div class="flex items-start justify-between">
                            <h3 class="font-serif text-lg font-bold text-darkChocolate">${product.name}</h3>
                            <div class="text-right">
                                <span class="text-xl font-bold text-deepBurgundy block">$${product.price.toFixed(2)}</span>
                                <span class="text-[10px] text-darkChocolate/50 uppercase font-bold tracking-wider">Por ${product.type}</span>
                            </div>
                        </div>
                        <p class="text-sm text-darkChocolate/70 mt-2 line-clamp-2">${product.desc}</p>
                    </div>
                    <button onclick="addToCart(${product.id})" class="w-full bg-deepBurgundy hover:bg-darkChocolate text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-2">
                        <span>Agregar al pedido</span>
                    </button>
                </div>
            </div>
        `;
    });
}

// Abrir y Cerrar el panel del Carrito Lateral
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.toggle('hidden');
}

// Añadir elemento al carrito de compras
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exist = cart.find(item => item.id === id);
    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    
    // Auto-desplegar carrito al agregar un dulce
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar && sidebar.classList.contains('hidden')) toggleCart();
}

// Modificar cantidades (+ / -) dentro del carrito
function changeQty(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCart();
}

// Actualizar la interfaz del carrito, insignias y totales
function updateCart() {
    const container = document.getElementById('cart-items-container');
    const countBadge = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');
    const emptyMsg = document.getElementById('empty-cart-msg');
    
    if (!container) return;
    container.innerHTML = '';
    
    let totalItems = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        if (emptyMsg) {
            container.appendChild(emptyMsg);
            emptyMsg.classList.remove('hidden');
        }
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        if (countBadge) countBadge.classList.add('hidden');
    } else {
        if (emptyMsg) emptyMsg.classList.add('hidden');
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        if (countBadge) countBadge.classList.remove('hidden');

        cart.forEach(item => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;

            container.innerHTML += `
                <div class="flex items-center space-x-4 bg-white p-3 rounded-xl border border-darkChocolate/5">
                    <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-cream">
                    <div class="flex-1">
                        <h4 class="font-serif text-sm font-bold text-darkChocolate">${item.name}</h4>
                        <span class="text-xs text-darkChocolate/60">$${item.price.toFixed(2)} / ${item.type}</span>
                        <div class="flex items-center space-x-2 mt-1">
                            <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 bg-softGray rounded-full flex items-center justify-center text-xs font-bold hover:bg-darkChocolate/10">-</button>
                            <span class="text-sm font-semibold">${item.quantity}</span>
                            <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 bg-softGray rounded-full flex items-center justify-center text-xs font-bold hover:bg-darkChocolate/10">+</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-sm font-bold text-deepBurgundy block">$ ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            `;
        });
    }

    if (countBadge) countBadge.innerText = totalItems;
    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    
    const modalTotal = document.getElementById('modal-total-amount');
    if (modalTotal) modalTotal.innerText = `$${subtotal.toFixed(2)}`;
}

// Control de ventanas modales para la Pasarela de Pago
function openCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('hidden');
    document.getElementById('payment-form').classList.remove('hidden');
    document.getElementById('payment-success').classList.add('hidden');
}

function closeCheckoutModal(clearCart = false) {
    document.getElementById('checkout-modal').classList.add('hidden');
    if (clearCart) {
        cart = [];
        updateCart();
        toggleCart();
    }
}

// Simulación estructurada de envío y procesamiento de Pasarela de Pago
function processPayment(e) {
    e.preventDefault();
    const btnText = document.getElementById('pay-btn-text');
    const spinner = document.getElementById('pay-spinner');
    const submitBtn = document.getElementById('pay-submit-btn');

    // Cambiar estado a cargando
    if (btnText) btnText.innerText = 'Procesando Pago...';
    if (spinner) spinner.classList.remove('hidden');
    if (submitBtn) submitBtn.disabled = true;

    setTimeout(() => {
        // Restaurar estado del botón
        if (btnText) btnText.innerText = 'Confirmar Pago Seguro';
        if (spinner) spinner.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = false;

        // Ocultar formulario y mostrar pantalla de éxito de compra
        document.getElementById('payment-form').classList.add('hidden');
        document.getElementById('payment-success').classList.remove('hidden');
    }, 2500);
}

// Filtrado visual de botones en la sección de Catálogo
function filterProducts(cat) {
    renderProducts(cat);
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-deepBurgundy', 'text-white', 'border-transparent');
        btn.classList.add('bg-white', 'text-darkChocolate', 'border-darkChocolate/10');
    });
    
    // Destacar botón activo de la categoría seleccionada
    const activeBtn = event.currentTarget;
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-darkChocolate', 'border-darkChocolate/10');
        activeBtn.classList.add('bg-deepBurgundy', 'text-white', 'border-transparent');
    }
}

// Inicialización de la Landing Page al cargar la ventana
window.onload = () => {
    renderProducts('all');
};