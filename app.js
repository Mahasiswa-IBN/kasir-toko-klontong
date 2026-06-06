/**
 * SembakoKu POS - Aplikasi Kasir Toko Kelontong
 * Core Logic, State Management, and Cashier Handlers
 */

// ==========================================================================
// 1. DEFAULT DATA SEEDS (GROCERY STORES INVENTORY)
// ==========================================================================
const DEFAULT_PRODUCTS = [
    {
        id: "p1",
        name: "Beras Pandan Wangi Premium 5 kg",
        category: "sembako",
        price: 78500,
        stock: 25,
        maxStock: 25,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fcd34d"/><rect x="25" y="20" width="50" height="65" rx="5" fill="%23fef3c7" stroke="%23d97706" stroke-width="3"/><path d="M50,30 L60,45 L40,45 Z" fill="%23b45309"/><circle cx="50" cy="60" r="10" fill="%23d97706"/><text x="50" y="80" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%2378350f">BERAS</text></svg>`
    },
    {
        id: "p2",
        name: "Minyak Goreng Sawit 2 L",
        category: "sembako",
        price: 34500,
        stock: 30,
        maxStock: 30,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fde047"/><path d="M35,35 L65,35 L60,85 L40,85 Z" fill="%23fbbf24" stroke="%23d97706" stroke-width="3"/><rect x="44" y="15" width="12" height="20" fill="%23d97706"/><circle cx="50" cy="60" r="12" fill="%23ca8a04"/><text x="50" y="64" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="%23fff">OIL</text></svg>`
    },
    {
        id: "p3",
        name: "Telur Ayam Negeri Fresh 1 kg",
        category: "sembako",
        price: 28000,
        stock: 15,
        maxStock: 15,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fed7aa"/><ellipse cx="35" cy="40" rx="12" ry="16" fill="%23ffedd5" stroke="%23ea580c" stroke-width="2"/><ellipse cx="65" cy="40" rx="12" ry="16" fill="%23ffedd5" stroke="%23ea580c" stroke-width="2"/><ellipse cx="50" cy="70" rx="14" ry="18" fill="%23ffedd5" stroke="%23ea580c" stroke-width="2"/><text x="50" y="74" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%23c2410c">TELUR</text></svg>`
    },
    {
        id: "p4",
        name: "Gula Pasir Putih Kebun Kita 1 kg",
        category: "sembako",
        price: 16500,
        stock: 40,
        maxStock: 40,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fed7aa"/><rect x="25" y="25" width="50" height="60" rx="3" fill="%23ffffff" stroke="%239a3412" stroke-width="3"/><circle cx="50" cy="50" r="12" fill="%23ffedd5"/><text x="50" y="54" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="%239a3412">GULA</text></svg>`
    },
    {
        id: "p5",
        name: "Mie Instan Rasa Soto Ayam Dus (40 Pcs)",
        category: "makanan",
        price: 112000,
        stock: 8,
        maxStock: 8,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fca5a5"/><rect x="20" y="30" width="60" height="45" fill="%23b91c1c" stroke="%237f1d1d" stroke-width="3"/><path d="M15,30 L85,30 L75,20 L25,20 Z" fill="%23ef4444" stroke="%237f1d1d" stroke-width="2"/><text x="50" y="55" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="%23fef08a">MIE INSTAN</text></svg>`
    },
    {
        id: "p6",
        name: "Teh Celup Kotak Isi 25",
        category: "minuman",
        price: 6500,
        stock: 50,
        maxStock: 50,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2386efac"/><rect x="25" y="30" width="50" height="40" fill="%2315803d" stroke="%2314532d" stroke-width="3"/><rect x="35" y="42" width="30" height="16" fill="%23fef08a"/><text x="50" y="53" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%23166534">TEA</text></svg>`
    },
    {
        id: "p7",
        name: "Susu UHT Cokelat 1 L",
        category: "minuman",
        price: 18500,
        stock: 20,
        maxStock: 20,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2393c5fd"/><rect x="30" y="20" width="40" height="65" fill="%23ffffff" stroke="%231d4ed8" stroke-width="3"/><path d="M30,20 L50,10 L70,20 Z" fill="%23ffffff" stroke="%231d4ed8" stroke-width="3"/><rect x="30" y="45" width="40" height="20" fill="%2378350f"/><text x="50" y="58" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="%23fff">MILK</text></svg>`
    },
    {
        id: "p8",
        name: "Kopi Bubuk Murni Robusta 200g",
        category: "minuman",
        price: 14000,
        stock: 3,
        maxStock: 20,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23d6d3d1"/><path d="M25,25 L75,25 L70,80 L30,80 Z" fill="%2378350f" stroke="%23451a03" stroke-width="3"/><circle cx="50" cy="50" r="14" fill="%23a8a29e"/><text x="50" y="53" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%23451a03">KOPI</text></svg>`
    },
    {
        id: "p9",
        name: "Keripik Singkong Pedas Manis 150g",
        category: "makanan",
        price: 9500,
        stock: 35,
        maxStock: 35,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fca5a5"/><path d="M25,20 L75,20 L80,85 L20,85 Z" fill="%23dc2626" stroke="%23991b1b" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="%23fbbf24"/><text x="50" y="54" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%23991b1b">KRIPIK</text></svg>`
    },
    {
        id: "p10",
        name: "Sabun Mandi Cair Sereh 450 mL",
        category: "kebutuhan-rumah",
        price: 22000,
        stock: 12,
        maxStock: 12,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23a7f3d0"/><path d="M30,35 C30,35 30,20 50,20 C70,20 70,35 70,35 L65,85 L35,85 Z" fill="%23059669" stroke="%23047857" stroke-width="3"/><rect x="45" y="10" width="10" height="10" fill="%23047857"/><text x="50" y="60" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="%23fff">SABUN</text></svg>`
    },
    {
        id: "p11",
        name: "Deterjen Bubuk Bersih Cemerlang 800g",
        category: "kebutuhan-rumah",
        price: 19500,
        stock: 18,
        maxStock: 18,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23c7d2fe"/><rect x="25" y="25" width="50" height="60" fill="%234f46e5" stroke="%233730a3" stroke-width="3"/><path d="M25,25 L75,25 L70,15 L30,15 Z" fill="%23818cf8"/><text x="50" y="58" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="%23fff">WASH</text></svg>`
    },
    {
        id: "p12",
        name: "Pasta Gigi Ekstra Segar 190g",
        category: "kebutuhan-rumah",
        price: 12500,
        stock: 2,
        maxStock: 10,
        image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2393c5fd"/><path d="M20,40 L80,30 L80,50 L20,60 Z" fill="%233b82f6" stroke="%231d4ed8" stroke-width="3"/><path d="M80,30 L90,28 L90,40 L80,42 Z" fill="%23ef4444"/><text x="50" y="48" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%23fff">ODOL</text></svg>`
    }
];

const IMAGE_PRESETS = [
    { name: "Sembako (Kuning)", value: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fcd34d"/><rect x="25" y="20" width="50" height="65" rx="5" fill="%23fef3c7" stroke="%23d97706" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="%23d97706"/><text x="50" y="80" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%2378350f">SEMBAKO</text></svg>` },
    { name: "Minyak/Cair (Minyak Emas)", value: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fde047"/><path d="M35,35 L65,35 L60,85 L40,85 Z" fill="%23fbbf24" stroke="%23d97706" stroke-width="3"/><text x="50" y="64" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="%23fff">OIL</text></svg>` },
    { name: "Minuman (Biru)", value: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2393c5fd"/><path d="M35,30 L65,30 L60,85 L40,85 Z" fill="%233b82f6" stroke="%231d4ed8" stroke-width="3"/><text x="50" y="60" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="%23fff">DRINK</text></svg>` },
    { name: "Makanan/Snack (Merah)", value: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fca5a5"/><path d="M25,20 L75,20 L80,85 L20,85 Z" fill="%23dc2626" stroke="%23991b1b" stroke-width="3"/><text x="50" y="54" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="%23991b1b">SNACK</text></svg>` },
    { name: "Rumah Tangga (Hijau)", value: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23a7f3d0"/><path d="M30,35 C30,35 30,20 50,20 C70,20 70,35 70,35 L65,85 L35,85 Z" fill="%23059669" stroke="%23047857" stroke-width="3"/><text x="50" y="60" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="%23fff">CLEAN</text></svg>` }
];

// ==========================================================================
// 2. POS STATE MANAGER
// ==========================================================================
let state = {
    products: [],
    cart: [],
    transactions: [],
    vouchers: {},
    isAdmin: false,
    activeCategory: "all",
    searchQuery: "",
    appliedPromo: null,
    theme: "light",
    invoiceSequence: 1,
    currentActiveImageSource: "preset",
    currentProductImage: ""
};

const DEFAULT_VOUCHERS = {
    "HEMAT5": { type: "percent", value: 5, label: "5%" },
    "MURAH": { type: "nominal", value: 10000, label: "Rp 10.000" },
    "DISKON10": { type: "percent", value: 10, label: "10%" }
};

// Save state to browser localstorage
function saveStateToLocalStorage() {
    localStorage.setItem("sembakoku_products", JSON.stringify(state.products));
    localStorage.setItem("sembakoku_cart", JSON.stringify(state.cart));
    localStorage.setItem("sembakoku_transactions", JSON.stringify(state.transactions));
    localStorage.setItem("sembakoku_vouchers", JSON.stringify(state.vouchers));
    localStorage.setItem("sembakoku_theme", state.theme);
    localStorage.setItem("sembakoku_invoice_seq", state.invoiceSequence);
}

// Load configurations
function loadInitialState() {
    state.theme = localStorage.getItem("sembakoku_theme") || "light";
    if (state.theme === "dark") {
        document.body.classList.add("dark");
        updateThemeToggleButtonIcon("dark");
    }

    const savedProducts = localStorage.getItem("sembakoku_products");
    if (savedProducts) {
        state.products = JSON.parse(savedProducts);
    } else {
        state.products = [...DEFAULT_PRODUCTS];
    }

    const savedCart = localStorage.getItem("sembakoku_cart");
    if (savedCart) {
        state.cart = JSON.parse(savedCart);
    }

    const savedTransactions = localStorage.getItem("sembakoku_transactions");
    if (savedTransactions) {
        state.transactions = JSON.parse(savedTransactions);
    }

    const savedVouchers = localStorage.getItem("sembakoku_vouchers");
    if (savedVouchers) {
        state.vouchers = JSON.parse(savedVouchers);
    } else {
        state.vouchers = { ...DEFAULT_VOUCHERS };
    }

    state.invoiceSequence = parseInt(localStorage.getItem("sembakoku_invoice_seq")) || 1;

    saveStateToLocalStorage();
    updateInvoiceIDDisplay();
}

// Update cashier invoice metadata
function updateInvoiceIDDisplay() {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const seqStr = String(state.invoiceSequence).padStart(4, "0");
    const currentId = `INV-${todayStr}-${seqStr}`;
    
    document.getElementById("current-invoice-id").textContent = currentId;
    document.getElementById("current-invoice-date").textContent = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

// Increment sequence for next transactions
function incrementInvoiceSequence() {
    state.invoiceSequence += 1;
    saveStateToLocalStorage();
    updateInvoiceIDDisplay();
}

// ==========================================================================
// 3. CLOCK & TICKERS
// ==========================================================================
function startClock() {
    const clockEl = document.getElementById("clock-time");
    function tick() {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString("id-ID");
    }
    tick();
    setInterval(tick, 1000);
}

// ==========================================================================
// 4. UTILITIES
// ==========================================================================
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let iconName = "check_circle";
    if (type === "error") iconName = "error";
    if (type === "warning") iconName = "warning";
    if (type === "info") iconName = "info";

    toast.innerHTML = `
        <span class="material-symbols-outlined">${iconName}</span>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function updateThemeToggleButtonIcon(theme) {
    const themeBtn = document.getElementById("theme-toggle");
    if (theme === "dark") {
        themeBtn.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`;
    } else {
        themeBtn.innerHTML = `<span class="material-symbols-outlined">dark_mode</span>`;
    }
}

// ==========================================================================
// 5. RENDERING FLOWS
// ==========================================================================

// Render Left Panel Product Catalog
function renderCatalog() {
    const grid = document.getElementById("catalog-grid");
    const noProductsDiv = document.getElementById("no-products");
    grid.innerHTML = "";
    
    let filtered = state.products;
    if (state.activeCategory !== "all") {
        filtered = filtered.filter(p => p.category === state.activeCategory);
    }
    
    if (state.searchQuery.trim() !== "") {
        const query = state.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }

    if (filtered.length === 0) {
        grid.style.display = "none";
        noProductsDiv.style.display = "block";
        return;
    }

    grid.style.display = "grid";
    noProductsDiv.style.display = "none";

    filtered.forEach(product => {
        const cartItem = state.cart.find(c => c.productId === product.id);
        const qtyInCart = cartItem ? cartItem.qty : 0;
        
        const stockPct = product.maxStock > 0 ? (product.stock / product.maxStock) * 100 : 0;
        let stockClass = "";
        let stockLabelText = "Stok OK";
        
        if (product.stock === 0) {
            stockLabelText = "HABIS";
            stockClass = "stock-out-badge";
        } else if (product.stock <= 5) {
            stockLabelText = "TIPIS";
            stockClass = "stock-low-badge";
        }

        const card = document.createElement("div");
        // POS Cues
        card.className = `product-card ${product.stock === 0 ? 'out-of-stock' : ''} ${qtyInCart > 0 ? 'in-cart' : ''}`;
        card.dataset.id = product.id;
        
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                <span class="product-tag tag-${product.category}">${product.category.replace('-', ' ')}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title" title="${product.name}">${product.name}</h3>
                <div class="product-price">${formatRupiah(product.price)}</div>
                
                <div class="stock-status">
                    <div class="stock-header">
                        <span class="stock-text">${stockLabelText}</span>
                        <span class="stock-number">${product.stock} pcs</span>
                    </div>
                    <div class="stock-bar-bg">
                        <div class="stock-bar-fill ${stockClass}" style="width: ${product.stock === 0 ? 0 : Math.max(stockPct, 8)}%"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Clicking anywhere on card adds it to the active order
        card.addEventListener("click", (e) => {
            if (product.stock === 0) {
                showToast("Barang ini habis, silakan restok terlebih dahulu.", "warning");
                return;
            }
            handleProductClick(product, e);
        });

        grid.appendChild(card);
    });
}

// Triggers adding product (with flying ball visual effects)
function handleProductClick(product, event) {
    const cartItem = state.cart.find(c => c.productId === product.id);
    const currentQty = cartItem ? cartItem.qty : 0;
    
    if (currentQty >= product.stock) {
        showToast(`Stok ${product.name} terbatas pada ${product.stock} pcs.`, "warning");
        return;
    }

    // Play POS flying effect
    playPOSFlyingAnimation(event);

    updateCartQuantity(product.id, currentQty + 1);
}

// Micro-animation coordinates builder
function playPOSFlyingAnimation(event) {
    // Starting coordinate
    const rect = event.currentTarget.getBoundingClientRect();
    // Destination coordinate
    const target = document.getElementById("invoice-items-container");
    const targetRect = target.getBoundingClientRect();

    const ball = document.createElement("div");
    ball.className = "flying-item";
    ball.style.top = `${rect.top + window.scrollY + 10}px`;
    ball.style.left = `${rect.left + window.scrollX + 10}px`;
    document.body.appendChild(ball);

    requestAnimationFrame(() => {
        ball.style.transform = `scale(0.2)`;
        ball.style.top = `${targetRect.top + window.scrollY + 50}px`;
        ball.style.left = `${targetRect.left + window.scrollX + 150}px`;
        ball.style.opacity = "0.1";
    });

    setTimeout(() => {
        ball.remove();
        target.classList.add("pulse-animation");
        setTimeout(() => target.classList.remove("pulse-animation"), 300);
    }, 600);
}

// Render Active Bill / Invoice pad
function renderPOSInvoice() {
    const listContainer = document.getElementById("invoice-items-list");
    const emptyState = document.getElementById("invoice-empty-state");
    const summaryFooter = document.getElementById("invoice-summary-footer");
    
    listContainer.innerHTML = "";
    
    let totalItems = 0;
    let subtotal = 0;

    if (state.cart.length === 0) {
        emptyState.style.display = "flex";
        summaryFooter.style.display = "none";
        return;
    }

    emptyState.style.display = "none";
    summaryFooter.style.display = "block";

    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        if (!product) return;

        totalItems += item.qty;
        const rowTotal = product.price * item.qty;
        subtotal += rowTotal;

        const row = document.createElement("div");
        row.className = "pos-cart-row";
        
        row.innerHTML = `
            <div class="pos-cart-details">
                <span class="pos-cart-title" title="${product.name}">${product.name}</span>
                <div class="pos-cart-meta">
                    <span class="pos-cart-price">${formatRupiah(product.price)}</span>
                    <div class="pos-qty-btns">
                        <button class="pos-qty-btn btn-pos-dec" aria-label="Kurangi">
                            <span class="material-symbols-outlined" style="font-size: 1rem;">remove</span>
                        </button>
                        <span class="pos-qty-num">${item.qty}</span>
                        <button class="pos-qty-btn btn-pos-inc" aria-label="Tambah">
                            <span class="material-symbols-outlined" style="font-size: 1rem;">add</span>
                        </button>
                    </div>
                </div>
            </div>
            <span class="pos-cart-total">${formatRupiah(rowTotal)}</span>
            <button class="btn-remove-row" aria-label="Hapus baris">
                <span class="material-symbols-outlined" style="font-size: 1.2rem;">close</span>
            </button>
        `;

        // Bind compact events
        row.querySelector(".btn-pos-dec").addEventListener("click", (e) => {
            e.stopPropagation();
            updateCartQuantity(product.id, item.qty - 1);
        });
        row.querySelector(".btn-pos-inc").addEventListener("click", (e) => {
            e.stopPropagation();
            if (item.qty >= product.stock) {
                showToast(`Stok ${product.name} terbatas pada ${product.stock} pcs.`, "warning");
                return;
            }
            updateCartQuantity(product.id, item.qty + 1);
        });
        row.querySelector(".btn-remove-row").addEventListener("click", (e) => {
            e.stopPropagation();
            updateCartQuantity(product.id, 0);
        });

        listContainer.appendChild(row);
    });

    // Promo calculations
    let discount = 0;
    if (state.appliedPromo) {
        const promo = state.vouchers[state.appliedPromo];
        if (promo) {
            if (promo.type === "percent") {
                discount = Math.floor(subtotal * (promo.value / 100));
            } else {
                discount = promo.value;
            }
            discount = Math.min(discount, subtotal);
            
            document.getElementById("promo-summary-row").style.display = "flex";
            document.getElementById("promo-code-applied").textContent = state.appliedPromo;
            document.getElementById("summary-discount").textContent = `-${formatRupiah(discount)}`;
        }
    } else {
        document.getElementById("promo-summary-row").style.display = "none";
    }

    // PPN Tax Math
    const taxableAmount = Math.max(subtotal - discount, 0);
    const tax = Math.floor(taxableAmount * 0.11);
    const grandTotal = taxableAmount + tax;

    // Display
    document.getElementById("summary-subtotal").textContent = formatRupiah(subtotal);
    document.getElementById("summary-tax").textContent = formatRupiah(tax);
    document.getElementById("summary-total").textContent = formatRupiah(grandTotal);
}

// Render product list in Admin Panel popup
function renderAdminProducts() {
    const tbody = document.querySelector("#admin-product-table tbody");
    tbody.innerHTML = "";

    state.products.forEach(product => {
        const row = document.createElement("tr");
        
        let stockWarning = "";
        if (product.stock === 0) {
            stockWarning = `<span class="product-tag tag-makanan" style="position:static; font-size:0.65rem;">HABIS</span>`;
        } else if (product.stock <= 5) {
            stockWarning = `<span class="product-tag tag-minuman" style="position:static; font-size:0.65rem;">SEDIKIT</span>`;
        } else {
            stockWarning = `<span class="product-tag tag-kebutuhan-rumah" style="position:static; font-size:0.65rem;">AMAN</span>`;
        }

        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" class="admin-prod-thumb"></td>
            <td><strong>${product.name}</strong></td>
            <td><span class="product-tag tag-${product.category}" style="position:static; font-size:0.7rem;">${product.category}</span></td>
            <td>${formatRupiah(product.price)}</td>
            <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <strong>${product.stock}</strong> / ${product.maxStock} ${stockWarning}
                </div>
            </td>
            <td>
                <div class="action-icon-group">
                    <button class="table-btn btn-edit-prod" title="Ubah Produk">
                        <span class="material-symbols-outlined" style="font-size:1.1rem;">edit</span>
                    </button>
                    <button class="table-btn btn-delete-prod" title="Hapus Produk">
                        <span class="material-symbols-outlined" style="font-size:1.1rem;">delete</span>
                    </button>
                </div>
            </td>
        `;

        row.querySelector(".btn-edit-prod").addEventListener("click", () => populateEditForm(product));
        row.querySelector(".btn-delete-prod").addEventListener("click", () => handleDeleteProduct(product.id));

        tbody.appendChild(row);
    });
}

// Render sales transactions logs in Admin Panel popup
function renderAdminTransactions() {
    const tbody = document.querySelector("#admin-transaction-table tbody");
    const noLogsDiv = document.getElementById("no-logs");
    
    tbody.innerHTML = "";

    if (state.transactions.length === 0) {
        document.getElementById("admin-transaction-table").style.display = "none";
        noLogsDiv.style.display = "block";
        return;
    }

    document.getElementById("admin-transaction-table").style.display = "table";
    noLogsDiv.style.display = "none";

    const sortedLogs = [...state.transactions].reverse();

    sortedLogs.forEach(tx => {
        const dateStr = new Date(tx.timestamp).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        });

        const itemsSummary = tx.items.map(item => `${item.name} (${item.qty}x)`).join(", ");

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><code style="font-weight:bold; color:var(--primary);">${tx.id}</code></td>
            <td><strong>${tx.customerName || "Umum"}</strong></td>
            <td>${dateStr}</td>
            <td style="max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${itemsSummary}">${itemsSummary}</td>
            <td><strong>${formatRupiah(tx.total)}</strong></td>
            <td><span class="product-tag" style="position:static; background:var(--bg-tertiary); color:var(--text-primary); text-transform:uppercase; font-size:0.7rem;">${tx.paymentMethod}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Calculate cashier statistics in real time
function updateDashboardMetrics() {
    // 1. Total Revenue (Omzet)
    const rev = state.transactions.reduce((acc, tx) => acc + tx.total, 0);
    document.getElementById("stat-revenue").textContent = formatRupiah(rev);

    // 2. Count of Transactions
    document.getElementById("stat-transactions").textContent = state.transactions.length;

    // 3. Count of Items Sold
    const itemsSold = state.transactions.reduce((acc, tx) => {
        const qtySum = tx.items.reduce((sum, item) => sum + item.qty, 0);
        return acc + qtySum;
    }, 0);
    document.getElementById("stat-items-sold").textContent = `${itemsSold} pcs`;

    // 4. Out of Stock / Low levels
    const outOrLowCount = state.products.filter(p => p.stock <= 5).length;
    document.getElementById("stat-out-stock").textContent = outOrLowCount;
}

function populateImagePresetsDropdown() {
    const select = document.getElementById("prod-image-preset");
    select.innerHTML = "";
    IMAGE_PRESETS.forEach((preset, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = preset.name;
        select.appendChild(option);
    });
}

// ==========================================================================
// 6. POS OPERATIONS HANDLERS
// ==========================================================================
function updateCartQuantity(productId, qty) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const cartIndex = state.cart.findIndex(c => c.productId === productId);

    if (qty <= 0) {
        if (cartIndex > -1) {
            state.cart.splice(cartIndex, 1);
        }
    } else {
        const actualQty = Math.min(qty, product.stock);
        if (cartIndex > -1) {
            state.cart[cartIndex].qty = actualQty;
        } else {
            state.cart.push({ productId, qty: actualQty });
        }
    }

    saveStateToLocalStorage();
    renderCatalog();
    renderPOSInvoice();
}

function applyPromoCode() {
    const codeVal = document.getElementById("promo-code").value.trim().toUpperCase();
    const feedback = document.getElementById("promo-feedback");

    if (codeVal === "") {
        state.appliedPromo = null;
        feedback.style.display = "none";
        renderPOSInvoice();
        return;
    }

    if (state.vouchers[codeVal]) {
        state.appliedPromo = codeVal;
        feedback.style.display = "block";
        feedback.className = "promo-feedback promo-success";
        feedback.textContent = `Promo "${codeVal}" aktif (${state.vouchers[codeVal].label})`;
        showToast("Voucher berhasil digunakan!");
    } else {
        state.appliedPromo = null;
        feedback.style.display = "block";
        feedback.className = "promo-feedback promo-error";
        feedback.textContent = "Voucher tidak terdaftar.";
        showToast("Voucher tidak valid.", "error");
    }

    saveStateToLocalStorage();
    renderPOSInvoice();
}

// Opens the cashier payment modal
function openCheckoutModal() {
    if (state.cart.length === 0) return;

    const modal = document.getElementById("checkout-modal");
    modal.style.display = "flex";

    // Set Invoice & Customer
    const currentInvId = document.getElementById("current-invoice-id").textContent;
    const custName = document.getElementById("customer-name").value.trim() || "Umum";

    document.getElementById("checkout-invoice-id").textContent = currentInvId;
    document.getElementById("checkout-customer-name").textContent = custName;

    // Build items list
    const summaryList = document.getElementById("checkout-summary-list");
    summaryList.innerHTML = "";
    
    let subtotal = 0;
    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        if (!product) return;

        const totalCost = product.price * item.qty;
        subtotal += totalCost;

        const row = document.createElement("div");
        row.className = "checkout-summary-item";
        row.innerHTML = `
            <span>${product.name} <strong>x${item.qty}</strong></span>
            <span>${formatRupiah(totalCost)}</span>
        `;
        summaryList.appendChild(row);
    });

    // Subtotal and Promo logic
    let discount = 0;
    if (state.appliedPromo) {
        const promo = state.vouchers[state.appliedPromo];
        if (promo) {
            if (promo.type === "percent") {
                discount = Math.floor(subtotal * (promo.value / 100));
            } else {
                discount = promo.value;
            }
            discount = Math.min(discount, subtotal);
            
            document.getElementById("checkout-discount-row").style.display = "flex";
            document.getElementById("checkout-discount").textContent = `-${formatRupiah(discount)}`;
        }
    } else {
        document.getElementById("checkout-discount-row").style.display = "none";
    }

    const taxableAmount = Math.max(subtotal - discount, 0);
    const tax = Math.floor(taxableAmount * 0.11);
    const grandTotal = taxableAmount + tax;

    document.getElementById("checkout-subtotal").textContent = formatRupiah(subtotal);
    document.getElementById("checkout-tax").textContent = formatRupiah(tax);
    document.getElementById("checkout-total").textContent = formatRupiah(grandTotal);

    // Setup Cash parameters
    const cashInput = document.getElementById("cash-amount");
    cashInput.value = "";
    document.getElementById("change-info-box").style.display = "none";
    
    document.getElementById("cash-exact-btn").dataset.value = grandTotal;

    // Focus cash amount immediately on open
    setTimeout(() => {
        cashInput.focus();
    }, 150);

    // Reset payment selection to default "Tunai"
    document.querySelector('input[name="payment-method"][value="tunai"]').checked = true;
    updatePaymentDetailsArea("tunai");
}

function updatePaymentDetailsArea(method) {
    document.getElementById("payment-cash-section").style.display = method === "tunai" ? "block" : "none";
    document.getElementById("payment-qris-section").style.display = method === "qris" ? "block" : "none";
    document.getElementById("payment-bank-section").style.display = method === "transfer" ? "block" : "none";
    
    if (method === "tunai") {
        document.getElementById("cash-amount").focus();
    }
}

function handleCashInput() {
    const grandTotal = parseFormattedRupiah(document.getElementById("checkout-total").textContent);
    const amountPaid = parseFloat(document.getElementById("cash-amount").value) || 0;

    const changeBox = document.getElementById("change-info-box");
    const changeVal = document.getElementById("cash-change-value");

    if (amountPaid <= 0) {
        changeBox.style.display = "none";
        return;
    }

    changeBox.style.display = "flex";
    if (amountPaid >= grandTotal) {
        const change = amountPaid - grandTotal;
        changeVal.textContent = formatRupiah(change);
        changeVal.style.color = "var(--primary)";
    } else {
        changeVal.textContent = "Uang Kurang!";
        changeVal.style.color = "#ef4444";
    }
}

function parseFormattedRupiah(formattedString) {
    return parseInt(formattedString.replace(/[^0-9]/g, "")) || 0;
}

// Final payment processing
function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const grandTotal = parseFormattedRupiah(document.getElementById("checkout-total").textContent);
    const currentInvId = document.getElementById("current-invoice-id").textContent;
    const custName = document.getElementById("customer-name").value.trim() || "Umum";

    let cashPaid = grandTotal;
    let change = 0;

    if (paymentMethod === "tunai") {
        const amountPaidInput = parseFloat(document.getElementById("cash-amount").value);
        if (isNaN(amountPaidInput) || amountPaidInput < grandTotal) {
            showToast("Pembayaran tunai kurang atau kosong.", "error");
            return;
        }
        cashPaid = amountPaidInput;
        change = cashPaid - grandTotal;
    }

    // Deduct stock
    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        if (product) {
            product.stock = Math.max(0, product.stock - item.qty);
        }
    });

    // Create log object
    const newTransaction = {
        id: currentInvId,
        customerName: custName,
        timestamp: new Date().toISOString(),
        items: state.cart.map(item => {
            const product = state.products.find(p => p.id === item.productId);
            return {
                id: item.productId,
                name: product.name,
                price: product.price,
                qty: item.qty,
                total: product.price * item.qty
            };
        }),
        subtotal: state.cart.reduce((acc, item) => {
            const product = state.products.find(p => p.id === item.productId);
            return acc + (product.price * item.qty);
        }, 0),
        promoApplied: state.appliedPromo,
        total: grandTotal,
        paymentMethod: paymentMethod,
        cashPaid: cashPaid,
        change: change
    };

    state.transactions.push(newTransaction);

    // Save and increment sequence
    incrementInvoiceSequence();
    saveStateToLocalStorage();

    // Show thermal receipt
    showReceiptModal(newTransaction);

    // Reset shopping active states
    state.cart = [];
    state.appliedPromo = null;
    document.getElementById("promo-code").value = "";
    document.getElementById("promo-feedback").style.display = "none";
    document.getElementById("customer-name").value = "Umum";
    
    saveStateToLocalStorage();

    // Refresh interfaces
    renderCatalog();
    renderPOSInvoice();
    renderAdminProducts();
    renderAdminTransactions();
    updateDashboardMetrics();

    // Close payment modal
    document.getElementById("checkout-modal").style.display = "none";
    showToast("Transaksi berhasil diproses!");
}

function showReceiptModal(tx) {
    const receiptModal = document.getElementById("receipt-modal");
    receiptModal.style.display = "flex";

    document.getElementById("receipt-id").textContent = tx.id;
    document.getElementById("receipt-customer").textContent = tx.customerName || "Umum";
    document.getElementById("receipt-date").textContent = new Date(tx.timestamp).toLocaleString("id-ID");
    
    const barcodeSvg = document.getElementById("barcode-svg");
    barcodeSvg.querySelector("text").textContent = tx.id;

    const tableBody = document.querySelector("#receipt-items-table tbody");
    tableBody.innerHTML = "";

    tx.items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-left">${item.name}</td>
            <td class="text-right">${item.qty}</td>
            <td class="text-right">${formatRupiah(item.price)}</td>
            <td class="text-right">${formatRupiah(item.total)}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("receipt-subtotal").textContent = formatRupiah(tx.subtotal);
    
    if (tx.promoApplied) {
        const promoRow = document.getElementById("receipt-discount-row");
        promoRow.style.display = "flex";
        document.getElementById("receipt-discount-code").textContent = tx.promoApplied;
        
        const promo = state.vouchers[tx.promoApplied];
        let disc = 0;
        if (promo.type === "percent") {
            disc = Math.floor(tx.subtotal * (promo.value / 100));
        } else {
            disc = promo.value;
        }
        disc = Math.min(disc, tx.subtotal);
        document.getElementById("receipt-discount").textContent = `-${formatRupiah(disc)}`;
    } else {
        document.getElementById("receipt-discount-row").style.display = "none";
    }

    const calculatedTax = Math.floor(Math.max(tx.subtotal - (tx.promoApplied ? (state.vouchers[tx.promoApplied].type === "percent" ? Math.floor(tx.subtotal * (state.vouchers[tx.promoApplied].value / 100)) : state.vouchers[tx.promoApplied].value) : 0), 0) * 0.11);

    document.getElementById("receipt-tax").textContent = formatRupiah(calculatedTax);
    document.getElementById("receipt-total").textContent = formatRupiah(tx.total);
    
    let payMethodName = "Tunai";
    if (tx.paymentMethod === "qris") payMethodName = "QRIS";
    if (tx.paymentMethod === "transfer") payMethodName = "Transfer Bank";

    document.getElementById("receipt-pay-method").textContent = payMethodName;
    document.getElementById("receipt-pay-amount").textContent = formatRupiah(tx.cashPaid);
    
    const changeRow = document.getElementById("receipt-change-row");
    if (tx.paymentMethod === "tunai") {
        changeRow.style.display = "flex";
        document.getElementById("receipt-change-amount").textContent = formatRupiah(tx.change);
    } else {
        changeRow.style.display = "none";
    }
}

function printReceipt() {
    window.print();
}

// Slide open/close Dashboard
function toggleDashboardModal(show) {
    if (show && !state.isAdmin) {
        document.getElementById("admin-login-modal").style.display = "flex";
        setTimeout(() => document.getElementById("admin-password").focus(), 150);
        return;
    }

    const modal = document.getElementById("dashboard-modal");
    if (show) {
        modal.style.display = "flex";
        renderAdminProducts();
        renderAdminTransactions();
        updateDashboardMetrics();
    } else {
        modal.style.display = "none";
    }
}

// ==========================================================================
// 7. ADMIN / INVENTORY OPERATIONS
// ==========================================================================
function populateEditForm(product) {
    document.getElementById("form-action-title").textContent = "Ubah Produk";
    document.getElementById("edit-product-id").value = product.id;
    document.getElementById("prod-name").value = product.name;
    document.getElementById("prod-category").value = product.category;
    document.getElementById("prod-price").value = product.price;
    document.getElementById("prod-stock").value = product.stock;
    document.getElementById("btn-reset-form").style.display = "inline-flex";
    document.getElementById("btn-save-text").textContent = "Simpan Perubahan";

    // Detect image type
    const presetIdx = IMAGE_PRESETS.findIndex(preset => preset.value === product.image);
    if (presetIdx > -1) {
        document.getElementById("prod-image-preset").value = presetIdx;
        handleImageSourceTabClick("preset");
    } else if (product.image.startsWith("data:image/")) {
        state.currentProductImage = product.image;
        handleImageSourceTabClick("file");
        document.getElementById("file-upload-text").textContent = "File Terunggah";
    } else {
        document.getElementById("prod-image-url").value = product.image;
        handleImageSourceTabClick("url");
    }

    updateImagePreview(product.image);
    document.getElementById("prod-name").focus();
}

function resetAdminForm() {
    document.getElementById("product-form").reset();
    document.getElementById("edit-product-id").value = "";
    document.getElementById("form-action-title").textContent = "Tambah Produk Baru";
    document.getElementById("btn-save-text").textContent = "Simpan Produk";
    document.getElementById("btn-reset-form").style.display = "none";

    document.getElementById("prod-image-url").value = "";
    document.getElementById("file-upload-text").textContent = "Pilih File...";
    document.getElementById("prod-image-file").value = "";

    handleImageSourceTabClick("preset");
}

function handleProductFormSubmit(e) {
    e.preventDefault();

    const editId = document.getElementById("edit-product-id").value.trim();
    const name = document.getElementById("prod-name").value.trim();
    const category = document.getElementById("prod-category").value;
    const price = parseFloat(document.getElementById("prod-price").value) || 0;
    const stock = parseInt(document.getElementById("prod-stock").value) || 0;
    
    let imageUrl = "";
    if (state.currentActiveImageSource === "preset") {
        const presetIdx = parseInt(document.getElementById("prod-image-preset").value) || 0;
        imageUrl = IMAGE_PRESETS[presetIdx].value;
    } else if (state.currentActiveImageSource === "file") {
        imageUrl = state.currentProductImage;
    } else if (state.currentActiveImageSource === "url") {
        imageUrl = document.getElementById("prod-image-url").value.trim();
    }

    if (name === "" || price <= 0) {
        showToast("Mohon masukkan nama produk dan harga yang valid.", "error");
        return;
    }

    if (!imageUrl || imageUrl.trim() === "") {
        showToast("Mohon pilih preset ikon, unggah gambar, atau masukkan URL gambar.", "error");
        return;
    }

    if (editId !== "") {
        const idx = state.products.findIndex(p => p.id === editId);
        if (idx > -1) {
            state.products[idx].name = name;
            state.products[idx].category = category;
            state.products[idx].price = price;
            
            state.products[idx].stock = stock;
            if (stock > state.products[idx].maxStock) {
                state.products[idx].maxStock = stock;
            }

            state.products[idx].image = imageUrl;
            showToast("Produk berhasil diperbarui!");
        }
    } else {
        const newProduct = {
            id: `p${Date.now()}`,
            name: name,
            category: category,
            price: price,
            stock: stock,
            maxStock: stock,
            image: imageUrl
        };
        state.products.push(newProduct);
        showToast("Produk baru berhasil ditambahkan!");
    }

    saveStateToLocalStorage();
    resetAdminForm();
    renderCatalog();
    renderAdminProducts();
    updateDashboardMetrics();
}

// ==========================================================================
// PRODUCT IMAGE EDITOR OPERATIONS
// ==========================================================================
function updateImagePreview(imageSrc) {
    const previewBox = document.getElementById("prod-image-preview-box");
    if (!previewBox) return;

    if (!imageSrc || imageSrc.trim() === "") {
        previewBox.innerHTML = `<span class="material-symbols-outlined preview-placeholder">image</span>`;
        return;
    }

    previewBox.innerHTML = `<img src="${imageSrc}" alt="Preview" onerror="this.src=''; this.outerHTML='<span class=\'material-symbols-outlined preview-placeholder\' style=\'color:#ef4444\'>broken_image</span>'">`;
}

function handleImageSourceTabClick(source) {
    state.currentActiveImageSource = source;

    document.querySelectorAll("#image-source-tabs .img-tab").forEach(tab => {
        if (tab.dataset.source === source) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });

    document.getElementById("container-img-preset").style.display = source === "preset" ? "block" : "none";
    document.getElementById("container-img-file").style.display = source === "file" ? "block" : "none";
    document.getElementById("container-img-url").style.display = source === "url" ? "block" : "none";

    if (source === "preset") {
        const idx = parseInt(document.getElementById("prod-image-preset").value) || 0;
        state.currentProductImage = IMAGE_PRESETS[idx].value;
    } else if (source === "file") {
        if (!state.currentProductImage || !state.currentProductImage.startsWith("data:image")) {
            state.currentProductImage = "";
        }
    } else if (source === "url") {
        state.currentProductImage = document.getElementById("prod-image-url").value.trim();
    }

    updateImagePreview(state.currentProductImage);
}

function setupImageEditor() {
    document.querySelectorAll("#image-source-tabs .img-tab").forEach(tab => {
        tab.addEventListener("click", (e) => {
            handleImageSourceTabClick(e.currentTarget.dataset.source);
        });
    });

    const presetSelect = document.getElementById("prod-image-preset");
    presetSelect.addEventListener("change", (e) => {
        const idx = parseInt(e.target.value) || 0;
        state.currentProductImage = IMAGE_PRESETS[idx].value;
        updateImagePreview(state.currentProductImage);
    });

    const fileInput = document.getElementById("prod-image-file");
    const fileText = document.getElementById("file-upload-text");
    
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        fileText.textContent = file.name;

        const reader = new FileReader();
        reader.onload = function(evt) {
            state.currentProductImage = evt.target.result;
            updateImagePreview(state.currentProductImage);
        };
        reader.readAsDataURL(file);
    });

    const urlInput = document.getElementById("prod-image-url");
    urlInput.addEventListener("input", (e) => {
        state.currentProductImage = e.target.value.trim();
        updateImagePreview(state.currentProductImage);
    });

    handleImageSourceTabClick("preset");
}

function handleDeleteProduct(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    if (confirm(`Apakah Anda yakin ingin menghapus produk "${product.name}"?`)) {
        state.products = state.products.filter(p => p.id !== productId);
        state.cart = state.cart.filter(c => c.productId !== productId);

        saveStateToLocalStorage();
        renderCatalog();
        renderPOSInvoice();
        renderAdminProducts();
        updateDashboardMetrics();
        showToast(`Produk "${product.name}" telah dihapus.`, "info");
    }
}

function clearTransactionHistory() {
    if (state.transactions.length === 0) return;

    if (confirm("Apakah Anda yakin ingin menghapus semua data riwayat transaksi?")) {
        state.transactions = [];
        state.invoiceSequence = 1;
        saveStateToLocalStorage();
        updateInvoiceIDDisplay();
        renderAdminTransactions();
        updateDashboardMetrics();
        showToast("Riwayat transaksi dan urutan nota direset.", "info");
    }
}

function handleAdminTabSwitch(tabName) {
    document.querySelectorAll(".admin-tab").forEach(tab => {
        if (tab.dataset.adminTab === tabName) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });

    document.getElementById("admin-tab-product-list").style.display = tabName === "product-list" ? "block" : "none";
    document.getElementById("admin-tab-transaction-log").style.display = tabName === "transaction-log" ? "block" : "none";
    document.getElementById("admin-tab-voucher-list").style.display = tabName === "voucher-list" ? "block" : "none";

    if (tabName === "voucher-list") {
        renderAdminVouchers();
    }
}

// ==========================================================================
// VOUCHER MANAGEMENT OPERATIONS
// ==========================================================================
function renderAdminVouchers() {
    const tbody = document.querySelector("#admin-voucher-table tbody");
    tbody.innerHTML = "";

    Object.keys(state.vouchers).forEach(code => {
        const v = state.vouchers[code];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><code>${code}</code></td>
            <td>${v.type === "percent" ? "Persen" : "Nominal"}</td>
            <td>${v.label}</td>
            <td>
                <button class="table-btn btn-delete-vouch" title="Hapus Voucher">
                    <span class="material-symbols-outlined" style="font-size:1.1rem;">delete</span>
                </button>
            </td>
        `;
        row.querySelector(".btn-delete-vouch").addEventListener("click", () => handleDeleteVoucher(code));
        tbody.appendChild(row);
    });
}

function handleAddVoucher(e) {
    e.preventDefault();
    const code = document.getElementById("vouch-code").value.trim().toUpperCase();
    const type = document.getElementById("vouch-type").value;
    const value = parseFloat(document.getElementById("vouch-value").value);

    if (code === "" || isNaN(value) || value <= 0) {
        showToast("Mohon isi data voucher dengan benar.", "error");
        return;
    }

    const label = type === "percent" ? `${value}%` : formatRupiah(value);
    state.vouchers[code] = { type, value, label };

    saveStateToLocalStorage();
    renderAdminVouchers();
    document.getElementById("voucher-form").reset();
    showToast(`Voucher "${code}" berhasil ditambahkan!`);
}

function handleDeleteVoucher(code) {
    if (confirm(`Hapus voucher "${code}"?`)) {
        delete state.vouchers[code];
        saveStateToLocalStorage();
        renderAdminVouchers();
        showToast(`Voucher "${code}" dihapus.`, "info");
    }
}

// ==========================================================================
// ADMIN AUTHENTICATION & EXPORT
// ==========================================================================
function handleAdminLogin(e) {
    e.preventDefault();
    const password = document.getElementById("admin-password").value;

    if (password === "admin123") {
        state.isAdmin = true;
        document.getElementById("admin-login-modal").style.display = "none";
        document.getElementById("admin-password").value = "";
        toggleDashboardModal(true);
        showToast("Login Admin Berhasil", "success");
    } else {
        showToast("Password Salah!", "error");
    }
}

function handleAdminLogout() {
    state.isAdmin = false;
    toggleDashboardModal(false);
    showToast("Anda telah keluar dari panel admin.", "info");
}

function handleExportCSV() {
    if (state.transactions.length === 0) {
        showToast("Tidak ada data untuk diekspor.", "warning");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Invoice ID,Customer,Timestamp,Items,Subtotal,Discount Code,Total,Payment Method\n";

    state.transactions.forEach(tx => {
        const items = tx.items.map(i => `${i.name}(${i.qty})`).join(" | ");
        const row = [
            tx.id,
            tx.customerName || "Umum",
            tx.timestamp,
            `"${items}"`,
            tx.subtotal,
            tx.promoApplied || "-",
            tx.total,
            tx.paymentMethod
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `laporan_penjualan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function handleThemeToggle() {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        state.theme = "light";
        updateThemeToggleButtonIcon("light");
        showToast("Mode Terang Aktif", "info");
    } else {
        document.body.classList.add("dark");
        state.theme = "dark";
        updateThemeToggleButtonIcon("dark");
        showToast("Mode Gelap Aktif", "info");
    }
    saveStateToLocalStorage();
}

// ==========================================================================
// 8. KEYBOARD SHORTCUTS BINDINGS
// ==========================================================================
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        // 1. F8: Bayar
        if (e.key === "F8") {
            e.preventDefault();
            if (state.cart.length > 0) {
                // If payment modal is already open, click processpayment
                const payModal = document.getElementById("checkout-modal");
                if (payModal.style.display === "flex") {
                    processPayment();
                } else {
                    openCheckoutModal();
                }
            } else {
                showToast("Keranjang belanja kosong.", "warning");
            }
        }

        // 2. F9: Dashboard Toko
        if (e.key === "F9") {
            e.preventDefault();
            const dashModal = document.getElementById("dashboard-modal");
            const isVisible = dashModal.style.display === "flex" || dashModal.style.display === "block";
            toggleDashboardModal(!isVisible);
        }

        // 3. Escape: Close open modals
        if (e.key === "Escape") {
            const receipt = document.getElementById("receipt-modal");
            const checkout = document.getElementById("checkout-modal");
            const dashboard = document.getElementById("dashboard-modal");

            if (receipt.style.display === "flex") {
                receipt.style.display = "none";
            } else if (checkout.style.display === "flex") {
                checkout.style.display = "none";
            } else if (dashboard.style.display === "flex" || dashboard.style.display === "block") {
                dashboard.style.display = "none";
            }
        }

        // 4. Enter in Checkout Modal
        if (e.key === "Enter") {
            const checkout = document.getElementById("checkout-modal");
            if (checkout.style.display === "flex") {
                // Focus element must not be inside inputs or dropdown if we want global Enter,
                // but for cashier convenience, pressing Enter inside cash-amount processes payment.
                if (document.activeElement.id === "cash-amount") {
                    e.preventDefault();
                    processPayment();
                }
            }
        }
    });
}

// ==========================================================================
// 9. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Load data
    loadInitialState();
    
    // 2. Start Clock
    startClock();
    
    // 3. Populates image selects
    populateImagePresetsDropdown();
    setupImageEditor();

    // 4. Core Renderings
    renderCatalog();
    renderPOSInvoice();
    updateDashboardMetrics();

    // 5. Category Tab clicks
    document.querySelectorAll(".category-tab").forEach(tab => {
        tab.addEventListener("click", (e) => {
            document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
            const target = e.currentTarget;
            target.classList.add("active");
            state.activeCategory = target.dataset.category;
            renderCatalog();
        });
    });

    // 6. Search input
    const searchInput = document.getElementById("search-input");
    const clearSearchBtn = document.getElementById("clear-search");
    
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        state.searchQuery = query;
        clearSearchBtn.style.display = query.trim() !== "" ? "flex" : "none";
        renderCatalog();
    });

    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.style.display = "none";
        state.searchQuery = "";
        renderCatalog();
        searchInput.focus();
    });

    document.getElementById("btn-clear-filters").addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.style.display = "none";
        state.searchQuery = "";
        state.activeCategory = "all";
        
        document.querySelectorAll(".category-tab").forEach(t => {
            if (t.dataset.category === "all") t.classList.add("active");
            else t.classList.remove("active");
        });
        
        renderCatalog();
        searchInput.focus();
    });

    // 7. Promo Code Voucher click
    document.getElementById("btn-apply-promo").addEventListener("click", applyPromoCode);
    document.getElementById("promo-code").addEventListener("keypress", (e) => {
        if (e.key === "Enter") applyPromoCode();
    });

    // 8. Invoice Reset Batal
    document.getElementById("btn-clear-invoice").addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin membatalkan transaksi aktif ini?")) {
            state.cart = [];
            state.appliedPromo = null;
            document.getElementById("promo-code").value = "";
            document.getElementById("promo-feedback").style.display = "none";
            document.getElementById("customer-name").value = "Umum";
            
            saveStateToLocalStorage();
            renderCatalog();
            renderPOSInvoice();
            showToast("Transaksi aktif dibatalkan.", "info");
        }
    });

    // 9. Payment Modal actions
    document.getElementById("btn-go-to-checkout").addEventListener("click", openCheckoutModal);
    document.getElementById("close-checkout-modal-btn").addEventListener("click", () => {
        document.getElementById("checkout-modal").style.display = "none";
    });
    document.getElementById("btn-cancel-checkout").addEventListener("click", () => {
        document.getElementById("checkout-modal").style.display = "none";
    });

    // Cash amounts quick actions
    document.querySelectorAll(".quick-cash-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const val = parseFloat(e.target.dataset.value);
            const cashInput = document.getElementById("cash-amount");
            cashInput.value = val;
            handleCashInput();
            document.getElementById("btn-process-payment").focus();
        });
    });

    document.getElementById("cash-amount").addEventListener("input", handleCashInput);

    // Payment radio changes
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener("change", (e) => {
            updatePaymentDetailsArea(e.target.value);
        });
    });

    // Confirm Payment
    document.getElementById("btn-process-payment").addEventListener("click", processPayment);

    // 10. Thermal Receipt Actions
    document.getElementById("btn-print-receipt").addEventListener("click", printReceipt);
    document.getElementById("btn-close-receipt").addEventListener("click", () => {
        document.getElementById("receipt-modal").style.display = "none";
        searchInput.focus();
    });

    // 11. Dashboard modal toggles
    document.getElementById("open-dashboard-btn").addEventListener("click", () => toggleDashboardModal(true));
    document.getElementById("close-dashboard-modal-btn").addEventListener("click", () => toggleDashboardModal(false));
    document.getElementById("btn-admin-logout").addEventListener("click", handleAdminLogout);
    
    // Admin Login handlers
    document.getElementById("admin-login-form").addEventListener("submit", handleAdminLogin);
    document.getElementById("close-login-modal-btn").addEventListener("click", () => {
        document.getElementById("admin-login-modal").style.display = "none";
    });

    document.querySelectorAll(".admin-tab").forEach(tab => {
        tab.addEventListener("click", (e) => {
            handleAdminTabSwitch(e.currentTarget.dataset.adminTab);
        });
    });

    // Inventory form submits
    document.getElementById("product-form").addEventListener("submit", handleProductFormSubmit);
    document.getElementById("btn-reset-form").addEventListener("click", resetAdminForm);
    document.getElementById("btn-clear-logs").addEventListener("click", clearTransactionHistory);
    document.getElementById("btn-export-csv").addEventListener("click", handleExportCSV);

    // Voucher form submit
    document.getElementById("voucher-form").addEventListener("submit", handleAddVoucher);

    // 12. Theme Switch
    document.getElementById("theme-toggle").addEventListener("click", handleThemeToggle);

    // 13. Setups shortcuts
    setupKeyboardShortcuts();
});
