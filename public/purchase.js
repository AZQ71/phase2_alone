const quantityInput = document.querySelector("#quantity");

// Function to fetch and display the selected item on the purchase page
async function displaySelectedProduct() {
  try {
    // Extract the item ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("itemId");

    // Fetch the item details using the item ID
    const response = await fetch(`/api/items/${itemId}`);
    const { item } = await response.json();
    // console.log(item);
    // Populate the HTML elements with the item details
    document.getElementById("productName").textContent = item.name;
    document.getElementById("productCategory").textContent = item.category;
    document.getElementById("productPrice").textContent = item.price;
    document.getElementById("productDescription").textContent =
      item.description;
    // document.getElementById("productQuantity").textContent = item.quantity;
  } catch (error) {
    console.error("Error fetching and displaying selected product:", error);
  }
}

// Call the displaySelectedProduct function when the purchase.html page loads
document.addEventListener("DOMContentLoaded", displaySelectedProduct);

async function purchaseItem(event) {
  try {
    event.preventDefault();
    // Extract the item ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("itemId");

    // Fetch the item details using the item ID
    const response = await fetch(`/api/items/${itemId}`);
    const { item } = await response.json();

    // Get the user from localstorage
    const username = JSON.parse(localStorage.getItem("user")).username;
    // Get the user from the api
    const userResponse = await fetch(`/api/users/${username}`);
    const { user } = await userResponse.json();
    // console.log(username, user);

    const totalPrice = document.querySelector("#totalPrice");
    totalPrice.textContent = `Total Price: $${
      item.price * quantityInput.value
    }`;
    // Check if the user has enough money to complete the purchase
    if (
      user.money_balance >= item.price &&
      item.quantity >= quantityInput.value
    ) {
      // Display a confirmation message
      const confirmation = confirm(
        `Are you sure you want to purchase ${
          item.name
        } for $${item.price.toFixed(2)}?`
      );

      if (confirmation) {
        // Make the purchase
        user.purchaseHistory.push(Number(item.id));
        user.money_balance -= item.price * quantityInput.value;
        console.log(user);
        // Update the user in the database
        await fetch(`/api/users/${username}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const seller = item.owner_username;
        // Get the seller from the api
        const sellerResponse = await fetch(`/api/users/${seller}`);
        const { user: sellerUser } = await sellerResponse.json();
        // Update the seller's balance
        sellerUser.money_balance += item.price * quantityInput.value;
        // console.log(sellerUser);
        sellerUser.sellHistory.push({
          item_id: Number(item.id),
          username: user.username,
        });
        // Update the seller in the database
        await fetch(`/api/users/${seller}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sellerUser),
        });

        // update quantity of item in the database
        item.quantity -= quantityInput.value;
        await fetch(`/api/items/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });

        // Display a success message
        const purchaseMessage = document.getElementById("purchaseMessage");
        purchaseMessage.textContent = `You have successfully purchased ${
          item.name
        } for $${item.price * quantityInput.value}`; // Display the total price
        purchaseMessage.style.display = "block";
        // Hide the purchase button
        document.getElementById("confirm-purchase").disabled = true;
      }
    } else {
      // Display an error message
      const purchaseMessage = document.getElementById("purchaseMessage");
      purchaseMessage.textContent =
        "Insufficient funds or quantity not available";
      purchaseMessage.style.display = "block";
    }
  } catch (error) {
    console.error("Error purchasing item:", error);
  }
}

// Add click event listener to the Confirm Purchase button
document
  .getElementById("confirm-purchase")
  .addEventListener("click", purchaseItem);
