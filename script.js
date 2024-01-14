// Fonction pour rechercher un Pokémon
function searchPokemon() {
    const searchInput = document.getElementById('searchInput');
    const pokemonName = searchInput.value.trim().toLowerCase();

    // Vérifiez si le nom du Pokémon est fourni
    if (pokemonName.length === 0) {
        alert('Veuillez entrer le nom d\'un Pokémon');
        return;
    }

    // Effectuez une requête API pour obtenir les détails du Pokémon spécifié
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué');
            }
            return response.json();
        })
        .then(pokemonData => {
            // Effacez le contenu actuel avant d'afficher le Pokémon recherché
            const container = document.getElementById('pokemonContainer');
            container.innerHTML = '';

            // Utiliser les détails du Pokémon pour créer une carte
            createPokemonCard(pokemonData);
        })
        .catch(error => {
            console.error('Erreur de requête API pour un Pokémon:', error);
        });
}





        // Fonction pour obtenir un index de Pokémon aléatoire
        function getRandomPokemonIndex() {
            return Math.floor(Math.random() * 1118);
        }

        // Fonction pour créer une carte Pokémon
        function createPokemonCard(pokemon) {
            const container = document.getElementById('pokemonContainer');

            // Créer une carte (card) pour chaque Pokémon
            const card = document.createElement('div');
            card.classList.add('card');

            // Créer un data-id pour l'ID du Pokémon
            const id = document.createElement('data-id');
            id.textContent = pokemon.id;


            // Créer une image pour le Pokémon
            const img = document.createElement('img');
            img.src = pokemon.sprites.front_shiny || pokemon.sprites.front_default;
            img.alt = pokemon.name;
            card.appendChild(img);

            // Créer un titre (nom) pour le Pokémon
            const h3 = document.createElement('h3');
            h3.textContent = pokemon.name;
            card.appendChild(h3);

            // Créer un button pour le Pokémon
            const button = document.createElement('a');
            button.classList.add('button');
            button.textContent = 'Plus d\'information';
            button.href = `produit.html?id=${pokemon.id}`;
            card.appendChild(button);

            // Ajouter la carte au conteneur
            container.appendChild(card);


                card.addEventListener('click', () => {
                    img.classList.toggle('flipped');
                    if (img.classList.contains('flipped')) {
                        img.src = pokemon.sprites.back_shiny || pokemon.sprites.back_default;
                    } else {
                        img.src = pokemon.sprites.front_shiny || pokemon.sprites.front_default;
                    }
                });
        }







      



        // Ajoutez cette fonction à la fin de votre script pour créer les cartes Pokémon initiales
function loadRandomPokemon() {
    for (let i = 0; i < 9; i++) {
        const randomOffset = getRandomPokemonIndex();
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomOffset}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La requête a échoué');
                }
                return response.json();
            })
            .then(pokemonData => {
                // Utiliser les détails du Pokémon pour créer une carte
                createPokemonCard(pokemonData);
            })
            .catch(error => {
                console.error('Erreur de requête API pour un Pokémon:', error);
            });
    }
}

// Chargez les Pokémon initiaux lors du chargement de la page
loadRandomPokemon();