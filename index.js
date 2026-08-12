import { inventoryArray } from './data.js';

const render = (inventory) => {
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
          <button class="add-button">+</button>
        </div>
      </div>
    `
  }).join('')

  ItemsContainerEl.innerHTML = inventoryHtml
}

render(inventoryArray)