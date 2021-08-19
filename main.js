let loginForm = document.querySelector(".signin-form");
let regForm = document.querySelector(".signinbtn");
// let delBtn = document.querySelector(".far.fa-trash-alt");
// delBtn.addEventListener("click", deleteProduct);

if (loginForm != null) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let user_details = {
      username: document.querySelector(".username").value,
      password: document.querySelector(".password").value,
    };

    fetch("https://boiling-brook-98620.herokuapp.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_details),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data["access_token"]) {
          console.log(data);
          localStorage.setItem("jwt_token", data["access_token"]);

          window.location.href = "landing.html";
        }
      });
  });
}

if (regForm != null) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let new_user = {
      first_name: document.querySelector(".user2").value,
      last_name: document.querySelector(".user3").value,
      username: document.querySelector(".user1").value,
      email_address: document.querySelector(".user4").value,
      address: document.querySelector(".user5").value,
      password: document.querySelector(".user6").value,
    };

    console.log(new_user);

    fetch("https://boiling-brook-98620.herokuapp.com/user-registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        window.location.href = "login.html";
      });
  });
}

// delete funcitions//
function deleteProduct(index) {
  console.log(index);

  let delConfirm = confirm("Are you sure you want to delete this product?");
  if (delConfirm) {
    let token = localStorage.getItem("jwt_token");

    console.log(token);
    fetch(
      `https://boiling-brook-98620.herokuapp.com/delete-product/${index}/`,
      {
        headers: {
          Authorization: `jwt ${token}`,
        },
      }
    )
      .then((respose) => respose.json())
      .then((data) => console.log(data));
    getProduct();
  }
}

function createCards(card) {
  console.log(card);
  return `
            <div class="cards">
              <div class="imgBx">
                <img src="./image/2.jpg" alt="" />
                <ul class="action">
                  <li><i class="fas fa-shopping-cart"></i></li>
                  <li onclick="deleteProduct(${card[0]}"><i class="far fa-trash-alt"></i></li>
                  <li>
                    <a href="./edit.html"><i class="fas fa-edit"></i></a>
                  </li>
                </ul>
              </div>
              <div class="content">
                <div class="productName">
                <h3>${card[1]}</h3>
                </div>
                <div>
                  <p>
                  ${card[5]}
                  </p>
                </div>
                <div class="price"><h2>${card[3]}</h2></div>

                <div class="rating">
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                </div>
              </div>
            </div>
          `;
}

function getProduct() {
  let container = document.querySelector(".cards");
  fetch("https://boiling-brook-98620.herokuapp.com/show-products/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let products = data.data;

      container.innerHTML = "";
      products.forEach((product) => {
        container.innerHTML += createCards(product);
      });
    });
}

getProduct();

function EditForm(product) {
  return `
  <div class="content">
  <div class="productName">
    <h3>${card[1]}</h3>
  </div>
  <div>
    <p>
      ${card[5]}
    </p>
  </div>
  <div class="price"><h2>${card[3]}</h2></div>

  <div class="rating">
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
  </div>
</div>          `;
}

function addProduct(item) {
  fetch("https://boiling-brook-98620.herokuapp.com/add-product/", {
    method: "POST",
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
    });
}

let form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector("#name").value;
  let price = document.querySelector("#price").value;
  let description = document.querySelector("#description").value;
  let category = document.querySelector("#category").value;

  let item = {
    name,
    price,
    description,
    category,
  };

  addProduct(item);
});

function addToCart(id) {
  let product = getProductById(id);
  let cart_items = JSON.parse(localStorage.getItem("cart"));

  if (cart_items == null) {
    cart_items = [];
  }

  cart_items.push(product);
  localStorage.setItem("cart", JSON.stringify(cart_items));
}
function getProduct(id) {
  let product = JSON.parse(localStorage.getItem("products"));
  return products.filter((product) => product.id == id);
}

getProducts();
