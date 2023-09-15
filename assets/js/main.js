const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 280
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openModal(pokemon) {
    const modalPokemonName = document.getElementById("modalPokemonName");
    const modalPokemonImage = document.getElementById("modalPokemonImage");
    const modalPokemonDescription = document.getElementById("modalPokemonDescription");

    modalPokemonName.textContent = pokemon.name;
    modalPokemonImage.src = pokemon.photo;
    modalPokemonImage.alt = pokemon.name;
    modalPokemonDescription.textContent = `Type: ${pokemon.types.join(", ")}\nNumber: #${pokemon.number}`;

    const modal = document.getElementById("pokemonModal");
    modal.style.display = "block";
}

// Evento de clique para abrir o modal quando um Pokémon da lista for clicado
pokemonList.addEventListener("click", (event) => {
    const clickedPokemon = event.target.closest("li.pokemon");
    if (clickedPokemon) {
        const pokemon = /* Obtenha as informações do Pokémon clicado, pode ser feito de acordo com a estrutura de dados que você possui */
        openModal(pokemon);
    }
});

// Evento de clique para fechar o modal quando o botão "X" for clicado
const closeModalButton = document.getElementById("closeModal");
closeModalButton.addEventListener("click", () => {
    const modal = document.getElementById("pokemonModal");
    modal.style.display = "none";
});

// Evento de clique para fechar o modal quando o usuário clicar fora do modal
window.addEventListener("click", (event) => {
    const modal = document.getElementById("pokemonModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

