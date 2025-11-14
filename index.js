// ---------------- PRODUCTS ------------------ //

const clothingProducts = [
  { id: 1, name: "Men's Polo T-Shirt", price: 399, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/r/k/q/m-polo-8014-kajaru-original-imahe7r5hnrpxthj.jpeg?q=70" },
  { id: 2, name: "Men's Slim Jeans", price: 799, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/jean/c/m/q/28-mv-bl-3-markview-original-imahdeqsm3payngn.jpeg?q=70" },
  { id: 3, name: "Men's Shirt", price: 549, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/a/u/b/xxl-501-hmcreation-original-imahhh5y5ngx8azy.jpeg?q=70" },
  { id: 4, name: "Winter Sweater", price: 999, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/g/4/m/m-winter-wear-bi-fashion-original-imah5rfabkcqaxtw.jpeg?q=70" }
];

const electronicsProducts = [
  { id: 101, name: "Smart Watch", price: 1299, img: "https://rukminim2.flixcart.com/image/312/312/xif0q/watch/z/r/g/-original-imahfspsffgqsfcx.jpeg?q=70" },
  { id: 102, name: "EGate Projector", price: 3499, img: "https://rukminim2.flixcart.com/image/240/240/xif0q/projector/h/e/n/atom-2x-10-5-ei9027-led-projector-egate-original-imahhsqm5ctgzae3.jpeg?q=60" },
  { id: 103, name: "ZEB Monitor", price: 6999, img: "https://rukminim2.flixcart.com/image/240/240/xif0q/monitor/g/9/9/-original-imahbk3vrnvhvhrn.jpeg?q=60" }
];


// ---------------- AUTH (Signup + Login) ------------------ //

document.addEventListener("DOMContentLoaded", () => {

  const signupBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!name || !email || !password) {
        alert("All fields are required!");
        return;
      }

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("Signup Successful!");
      window.location.href = "login.html";
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return alert("No account found, please signup!");

      if (email === user.email && password === user.password) {
        localStorage.setItem("loggedIn", true);
        window.location.href = "dashboard.html";
      } else {
        alert("Incorrect email or password!");
      }
    });
  }

  // Render items
  if (document.getElementById("product-card")) {
    renderProducts(clothingProducts, "product-card");
    renderProducts(electronicsProducts, "electronic-product-card");
  }

  if (document.getElementById("cart-container")) {
    renderCartPage();
  }
});


// ---------------- PRODUCT DISPLAY ------------------ //

function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("col-3");

    div.innerHTML = `
      <div class="card p-2">
        <img src="${p.img}" class="card-img-top" style="height:200px;">
        <div class="card-body">
          <h5>${p.name}</h5>
          <p>₹${p.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${p.id}, '${p.name}', ${p.price}, '${p.img}')">Add to Cart</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}


// ---------------- CART FUNCTIONS ------------------ //

function addToCart(id, name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exist = cart.find(item => item.id === id);

  if (exist) exist.qty++;
  else cart.push({ id, name, price, img, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart!");
}

function renderCartPage() {
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `<h3>Your cart is empty 😢</h3>`;
    cartTotal.textContent = 0;
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.classList.add("col-4");

    div.innerHTML = `
      <div class="card p-2">
        <img src="${item.img}" style="height:200px;">
        <h5>${item.name}</h5>
        <p>₹${item.price}</p>
        <p>Qty: ${item.qty}</p>

        <button class="btn btn-danger" onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  cartTotal.textContent = total;
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPage();
}


// ---------------- CART BUTTON ------------------ //
const cartBtn = document.getElementById("cart-btn");
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}
