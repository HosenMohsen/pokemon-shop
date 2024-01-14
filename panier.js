// Fonction pour afficher les éléments du panier
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    
    // Récupérer le panier depuis le localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Afficher chaque élément du panier
   // Afficher chaque élément du panier
cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Créer une balise <img> pour afficher l'image du Pokémon
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    cartItem.appendChild(img);

    // Créer des éléments pour chaque propriété du Pokémon
    const name = document.createElement('p');
    name.textContent = `Nom: ${item.name}`;

    const type = document.createElement('p');
    type.textContent = `Type: ${item.type}`;

    const price = document.createElement('p');
    price.textContent = `Prix: ${item.price}€`;

    // Ajouter les éléments au conteneur du panier
    cartItem.appendChild(name);
    cartItem.appendChild(type);
    cartItem.appendChild(price);

    // Ajouter un bouton pour retirer l'élément du panier
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Retirer du panier';
    removeButton.addEventListener('click', () => {
        removeFromCart(index);
        // Mettre à jour l'affichage après la suppression
        cartContainer.innerHTML = '';
        displayCart();
    });
    cartItem.appendChild(removeButton);

    cartContainer.appendChild(cartItem);
});
}


// Appeler la fonction pour afficher le panier au chargement de la page
displayCart();

// Fonction pour retirer un élément du panier
function removeFromCart(index) {
    // Récupérer le panier depuis le localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Retirer l'élément du panier en fonction de l'index
    cart.splice(index, 1);

    // Mettre à jour le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}