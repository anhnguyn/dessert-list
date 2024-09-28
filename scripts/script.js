const renderDessertItems = () => {
    const desserts = document.querySelector('#desserts')

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(dessert => {
            const dessertItem = document.createElement('div');
            dessertItem.classList.add('card');

            dessertItem.innerHTML = `
                <div class="thumbnail">
                    <picture>
                        <source width="100%" media="(max-width:767px)" srcset="${dessert.image.mobile}">
                        <source media="(min-width:1024px)" srcset="${dessert.image.desktop}">
                        <img src="${dessert.image.tablet}" alt="${dessert.name}" style="width: auto; max-width: 100%">
                    </picture>
                    <button class="add-cart" onClick="${addToCart}">Add to Cart</button>
                </div>

                <h3>${dessert.category}</h3>
                <h4>${dessert.name}</h4>
                <h5>€${dessert.price.toFixed(2)}</h5>


            `
            desserts.appendChild(dessertItem);
        })
    })
}

const addToCart = () => {
    console.log('addToCart')
}

window.onload = () => {
    renderDessertItems();
}


const openConfirmModal = () => {
    const confirmModal = document.querySelector("#confirm-modal");
    confirmModal.showModal();
}