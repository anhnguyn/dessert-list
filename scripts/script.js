const addedItems = [];

const renderDessertItems = () => {
    const desserts = document.querySelector('#desserts')

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(dessert => {
            const dessertItem = document.createElement('div');
            dessertItem.classList.add('card');

            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            const picture = document.createElement('picture');

            const mobileImg = document.createElement('source');
            mobileImg.setAttribute('width', '100%');
            mobileImg.setAttribute('media', '(max-width:767px)');
            mobileImg.setAttribute('srcset', dessert.image.mobile);
            picture.appendChild(mobileImg);

            const desktopImg = document.createElement('source');
            desktopImg.setAttribute('media', '(min-width:1024px)');
            desktopImg.setAttribute('srcset', dessert.image.desktop);

            const defaultImg = document.createElement('img');
            defaultImg.setAttribute('src', dessert.image.tablet);
            defaultImg.style.width = "auto";
            defaultImg.style.maxWidth = "100%";

            picture.appendChild(mobileImg);
            picture.appendChild(desktopImg);
            picture.appendChild(defaultImg);

            const addToCartBtn =  document.createElement('button');
            addToCartBtn.classList.add('add-cart');
            addToCartBtn.textContent = 'Add to Cart';

            thumbnail.appendChild(picture);
            thumbnail.appendChild(addToCartBtn);

            const itemCategory = document.createElement('h3');
            itemCategory.textContent = dessert.category;

            const itemName = document.createElement('h4');
            itemName.textContent = dessert.name;

            const itemPrice = document.createElement('h5');
            itemPrice.textContent = '€' + dessert.price.toFixed(2);

            dessertItem.appendChild(thumbnail);
            dessertItem.appendChild(itemCategory);
            dessertItem.appendChild(itemName);
            dessertItem.appendChild(itemPrice);

            addToCartBtn.addEventListener('click', () => addToCart(dessert));
            desserts.appendChild(dessertItem);
        })
    })
}

function addToCart(dessert) {
    const existingItem = addedItems.find(item => item.name === dessert.category)

    if (existingItem) {
        existingItem.count++;
    } else {
        const dessertItem = {
            name: dessert.category,
            price: dessert.price,
            count: 1,
        }
        addedItems.push(dessertItem);
    }
    renderCart();
}

function renderCart() {
    const cart = document.getElementById('cart');

    if (addedItems.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Your added items will appear here.';
        cart.appendChild(message);
    }

    const cartQty = addedItems.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    console.log("🚀 ~ cartQty ~ cartQty:", cartQty)
}


window.onload = () => {
    renderDessertItems();
    renderCart();
}


const openConfirmModal = () => {
    const confirmModal = document.querySelector("#confirm-modal");
    confirmModal.showModal();
}