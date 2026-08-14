import { inventoryArray } from './data.js';

// Global Array that stores customers in cart items
const itemsInCartArray = [];

// Function that renders current available items in stock 
const renderList = (inventory) => {
  const ItemsContainerEl = document.getElementById('items-container')

  ItemsContainerEl.innerHTML = ''

  const inventoryHtml = inventory.map(item => {
    return `
      <div class="item-card">
        <div class="item-description">
          <div class="item-emoji">
            <p>${item.emoji}</p>
          </div>
          <div class="item-details">
            <h2 class="item-name">${item.name}</h2>
            <p class="item-ingredients">${item.ingredients.join(', ')}</p>
            <h4 class="item-price">$${item.price}</h4>
          </div>
        </div>
        <div class="item-button">
          <button class="add-button" data-item-id=${item.id}>+</button>
        </div>
      </div>
    `
  }).join('')

  ItemsContainerEl.innerHTML = inventoryHtml
}

// Event Listener that triggers when user clicks a button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-button')) {
    const addedItem = handleAddToCart(e.target.dataset.itemId)
    itemsInCartArray.push(addedItem)
    renderReceipt()
  }
  else if (e.target.classList.contains('remove-btn')) {
    const targetIndex = e.target.dataset.index

    itemsInCartArray.splice(targetIndex, 1)
    renderReceipt()
  }
  else if (e.target.closest('.order-button')) {
    formPopUp()
  }
  else if (e.target.closest('.pay-btn')) {
    e.preventDefault()
    paymentConfirmationMessage()
  }
})

const handleAddToCart = (itemId) => {
  return inventoryArray.filter(item => item.id == itemId)[0]
}

// Function that builds and renders the order receipt
const renderReceipt = () => {
  const orderContainerEl = document.getElementById('order-container')

  if (itemsInCartArray.length === 0) {
    orderContainerEl.innerHTML = ''
    return
  }

  const itemsInCartHtml = itemsInCartArray.map((item, index) => {
    return `
      <div class="order-item-container">
        <div class="order-item-description">
          <p class="order-items-name">${item.name}</p>
          <button class="remove-btn" data-index=${index}>remove</button>
        </div>
        <div>
          <p class="order-item-price">$${item.price}</p>
        </div>
      </div>
    `
  }).join('')

  const totalPrice = itemsInCartArray.reduce((total, currentItem) => {
    return total + currentItem.price
  }, 0)

  orderContainerEl.innerHTML = `
    <h2 class="receipt-order-title">Your Order</h2>
      <div class="order-items-list">
        ${itemsInCartHtml}
      </div>
      <div class="order-divider"></div>
      <div class="order-total-section">
        <p class="total-label">Total price:</p>
        <p class="total-price">$${totalPrice}</p>
      </div>
      <button class="order-button">Complete order</button>
    `
}

const formPopUp = () => {
  const formModalEl = document.getElementById('form-modal')
  formModalEl.classList.remove('hidden')
}

const paymentConfirmationMessage = () => {
  const formModalEl = document.getElementById('form-modal')
  const orderContainerEl = document.getElementById('order-container')
  const customerNameInput = document.getElementById('customerName').value

  formModalEl.classList.add('hidden')

  itemsInCartArray.length = 0

  orderContainerEl.innerHTML = `
    <div class="confirmation-message">
      <h2>Thanks, ${customerNameInput}!</h2>
      <p>Your order is on its way!</p>
    </div>
  `
}

renderList(inventoryArray)