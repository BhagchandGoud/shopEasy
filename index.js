let user = JSON.parse(localStorage.getItem("loggedInUser"));

function checkLogin() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const protectedPages = ['dashboard.html', 'Cart.html'];
    
    if (protectedPages.includes(currentPage) && !user) {
        alert("Please login first!");
        window.location.href = "login.html";
    }
}

checkLogin();

// Register User
function registerUser(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find(u => u.email === email);
    if (exist) return alert("User already exists!");

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    window.location.href = "login.html";
}


if (document.querySelector("#signup-btn")) {
    document.querySelector("#signup-btn").addEventListener("click", registerUser);
}

// Login User
function loginUser(event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(u => u.email === email && u.password === password);

    if (!validUser) return alert("Invalid email or password!");

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    user = validUser;

    alert("Login successful!");
    window.location.href = "dashboard.html";
}


if (document.querySelector("#login-btn")) {
    document.querySelector("#login-btn").addEventListener("click", loginUser);
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}




const clothingProducts = [
    { id: 1, name: "Men's Polo T-Shirt", price: 399, category: "tshirts", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/r/k/q/m-polo-8014-kajaru-original-imahe7r5hnrpxthj.jpeg?q=70" },
    { id: 2, name: "Men's Slim Fit Jeans", price: 799, category: "jeans", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/jean/c/m/q/28-mv-bl-3-markview-original-imahdeqsm3payngn.jpeg?q=70" },
    { id: 3, name: "Men's Casual Shirt", price: 549, category: "shirts", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/a/u/b/xxl-501-hmcreation-original-imahhh5y5ngx8azy.jpeg?q=70" },
    { id: 4, name: "Men's Winter Sweater", price: 999, category: "jackets", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/g/4/m/m-winter-wear-bi-fashion-original-imah5rfabkcqaxtw.jpeg?q=70" },
    { id: 5, name: "Men's Trendy Sneakers", price: 1099, category: "shoes", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/c/0/o/6-group-333-6-aadi-black-original-imahffdvmduzzpdc.jpeg?q=70" },
    { id: 6, name: "Men's Formal Trousers", price: 699, category: "pants", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/trouser/d/c/m/38-men-s-slimfit-viscose-rayon-trousers-durable-easy-care-fabric-original-imahgczj2z42gyyh.jpeg?q=70" }
];

// ELECTRONICS PRODUCTS
const electronicsProducts = [
    { id: 101, name: "Smart Digital Watch", price: 1299, category: "watch", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/watch/z/r/g/-original-imahfspsffgqsfcx.jpeg?q=70" },
    { id: 102, name: "EGate Mini Projector", price: 3499, category: "projector", img: "https://rukminim2.flixcart.com/image/240/240/xif0q/projector/h/e/n/atom-2x-10-5-ei9027-led-projector-egate-original-imahhsqm5ctgzae3.jpeg?q=60" },
    { id: 103, name: "ZEB Full HD Monitor", price: 6999, category: "monitor", img: "https://rukminim2.flixcart.com/image/240/240/xif0q/monitor/g/9/9/-original-imahbk3vrnvhvhrn.jpeg?q=60" }
];



function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";

        card.innerHTML = `
            <img src="${p.img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text">₹${p.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${p.id}, '${containerId}')">Add to Cart</button>
            </div>
        `;

        container.appendChild(card);
    });
}



// =========================
// CART SYSTEM
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart
function addToCart(id, type) {
    if (!user) return alert("Please login first!");

    let product;

    if (type === "product-card") {
        product = clothingProducts.find(p => p.id === id);
    } else {
        product = electronicsProducts.find(p => p.id === id);
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCartCount();
}

// Cart Count
function loadCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (cartCount) cartCount.textContent = cart.length;
}

loadCartCount();



// =========================
// RENDER CART PAGE
// =========================

function renderCartPage() {
    const cartContainer = document.querySelector("#cart-container");
    const cartTotal = document.querySelector("#cart-total");

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h3>Your cart is empty</h3>";
        cartTotal.textContent = "₹0";
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" width="80">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>
        `;
    });

    cartTotal.textContent = "₹" + total;
}

renderCartPage();



// =========================
// SEARCH + FILTER
// =========================

const searchInput = document.getElementById("searchInput");
const clothingCollection = document.getElementById("clothingCollection");
const electronicsCollection = document.getElementById("electronicsCollection");

function renderFilteredProducts() {
    const search = searchInput ? searchInput.value.toLowerCase() : "";

    // Clothing
    const clothCat = clothingCollection ? clothingCollection.value : "Collections";
    const filteredClothing = clothingProducts.filter(p =>
        (clothCat === "Collections" || p.category === clothCat) &&
        p.name.toLowerCase().includes(search)
    );

    // Electronics
    const elecCat = electronicsCollection ? electronicsCollection.value : "Collections";
    const filteredElectronics = electronicsProducts.filter(p =>
        (elecCat === "Collections" || p.category === elecCat) &&
        p.name.toLowerCase().includes(search)
    );

    renderProducts(filteredClothing, "product-card");
    renderProducts(filteredElectronics, "elctroinc-product-card");
}

// Add Events
if (searchInput) searchInput.addEventListener("input", renderFilteredProducts);
if (clothingCollection) clothingCollection.addEventListener("change", renderFilteredProducts);
if (electronicsCollection) electronicsCollection.addEventListener("change", renderFilteredProducts);

// Load products initially
renderFilteredProducts();
