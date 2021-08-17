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
    createCards();
  }
}

function createCards(card) {
  console.log(card);
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
</div>
<a href="./add.html"><button>ADD PRODUCT</button></a>
  `;
}

function getProduct() {
  let container = document.querySelector(".container");
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

function addProduct(new_item) {
  fetch("/add-product/", {
    method: "POST",

    body: JSON.stringify(new_item),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((responce) => responce.json())
    .then((data) => console.log(data));

  getProducts();
}
