const product_grid = document.querySelector(".product-grid");

$(window).on("load", function () {
  performNotification();
});

//notification function
function performNotification() {
  $(".notifications").removeClass("fadeOut").addClass("fadeInLeft");
  setTimeout(function () {
    $(".notifications").removeClass("fadeInLeft").addClass("fadeOut");
  }, 3000);
}

function getItems() {
  fetch("/api/items")
    .then((response) => response.json())
    .then((items) => {
      displayItems(items);
    })
    .catch((error) => console.error("Error fetching items:", error));
}

function displayItems({ items }) {
  items.forEach((item) => {
    let product = document.createElement("div");
    // product.classList.add("grid-product");
    product.classList.add("product");
    product.innerHTML = `
      <div class="img-name" style="background-image: url(${item.url})"><h3>${
      item.name
    }</h3></div>
      <p>Category: ${item.category}</p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Description: ${item.description}</p>
      <a href="purchase.html?itemId=${
        item.id
      }"><button class="buy-button">Buy</button></a>
    `;
    product.setAttribute("data-id", item.id);
    product_grid.appendChild(product);
  });
}

getItems();

const searchButton = document.getElementById("searchButton");
// Add click event listener to the search button
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default behavior of the anchor tag
  searchItems(); // Trigger searchItems function
});

// Function to search for items when the search button is clicked and only display that item
function searchItems() {
  const searchInput = document.getElementById("searchInput").value; // Get the value of the search input
  const products = document.querySelectorAll(".product"); // Get all the products
  products.forEach((product) => {
    // Loop through each product
    const productName = product.querySelector("h3").textContent; // Get the product name
    if (productName.toLowerCase().includes(searchInput.toLowerCase())) {
      // Check if the product name includes the search input
      product.style.display = "block"; // Display the product
    } else {
      product.style.display = "none"; // Hide the product
    }
  });
}
