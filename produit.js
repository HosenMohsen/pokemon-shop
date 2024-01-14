// Fonction pour créer une carte Pokémon qui affiche les informations spécifiques
function createPokemonCard(pokemon) {
    const container = document.getElementById('pokemonContainer');

    // Créer une carte (card) pour chaque Pokémon
    const card = document.createElement('div');
    card.classList.add('card');

    // Créer une image pour le Pokémon
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_shiny || pokemon.sprites.front_default;
    img.alt = pokemon.name;
    card.appendChild(img);

    // Créer un titre (nom) pour le Pokémon
    const h3 = document.createElement('h3');
    h3.textContent = pokemon.name;
    card.appendChild(h3);

    // Créer un paragraphe pour le type du Pokémon
    const pType = document.createElement('p');
    pType.textContent = `Type: ${pokemon.types[0].type.name}`;
    card.appendChild(pType);

    // Créer un paragraphe pour la vie du Pokémon
    const pHP = document.createElement('p');
    pHP.textContent = `Vie: ${pokemon.stats[0].base_stat}`;
    card.appendChild(pHP);

    // Créer un paragraphe pour l'attaque du Pokémon
    const pAttack = document.createElement('p');
    pAttack.textContent = `Attaque: ${pokemon.stats[1].base_stat}`;
    card.appendChild(pAttack);

    // Créer un paragraphe pour la défense du Pokémon
    const pDefense = document.createElement('p');
    pDefense.textContent = `Défense: ${pokemon.stats[2].base_stat}`;
    card.appendChild(pDefense);

    // Générer un prix aléatoire pour le Pokémon
    const prix = Math.floor(Math.random() * 90) + 10; // Prix entre 10€ et 100€a

    // Créer un paragraphe pour le prix du Pokémon
    const pPrice = document.createElement('p');
    pPrice.textContent = `Prix: ${prix}€`;
    card.appendChild(pPrice);

    // Créer un bouton pour ajouter au panier
    const button = document.createElement('a');
    button.classList.add('button');
    button.textContent = 'Ajouter au panier';
    button.href = 'panier.html'; // Ajouter l'ID du Pokémon dans l'URL
    card.appendChild(button);


    button.addEventListener('click', () => {
        addToCart(pokemon);
    });

    function addToCart(pokemon) {
        // Récupérer le panier depuis le localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Ajouter le Pokémon au panier
        cart.push({
            img: pokemon.sprites.front_shiny || pokemon.sprites.front_default,
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            price: prix, // Générer un prix aléatoire
            
        });
    
        // Mettre à jour le panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
    }

    // Ajouter la carte au conteneur
    container.appendChild(card);

    // Ajouter un événement au clic sur la carte pour retourner l'image
    card.addEventListener('click', () => {
        img.classList.toggle('flipped');
        if (img.classList.contains('flipped')) {
            img.src = pokemon.sprites.back_shiny || pokemon.sprites.back_default;
        } else {
            img.src = pokemon.sprites.front_shiny || pokemon.sprites.front_default;
        }
    });
}







// Récupérer l'URL actuelle
var url = window.location.href;

// Extraire les paramètres de l'URL
var urlParams = new URLSearchParams(url.split('?')[1]);

// Récupérer la valeur de l'ID à partir des paramètres
var pokemonId = urlParams.get('id');

// Si pokemonId est null, il peut y avoir une erreur ou l'ID n'est pas présent dans l'URL
if (pokemonId === null) {
    console.error('L\'ID du Pokémon n\'a pas été correctement extrait de l\'URL.');
} else {
    console.log('ID du Pokémon:', pokemonId);

    // Le reste du code pour récupérer les informations du Pokémon et créer la carte
    var apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            createPokemonCard(data);
        })
        .catch(error => console.log('Erreur de requête API pour un Pokémon:', error));
}




