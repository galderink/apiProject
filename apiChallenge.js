
let pokeContainer = document.getElementById('pokeContainer');
let colors = {
    fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

let mainType = Object.keys(colors);

console.log(mainType);

let pokemonNumber = 150;
let fetchPokemons = async () => {
	for(let i=1;i<=pokemonNumber;i++){
		await getPokemon(i);
	}
}


let getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const response = await fetch(url);
	let pokemon = await response.json();
	createPokemonCard(pokemon);
}


function createPokemonCard(pokemon){
    let pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    let pokeTypes = pokemon.types.map(el => el.type.name);
    let type = mainType.find(
        type => pokeTypes.indexOf(type)> -1
    );

    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    let color = colors[type];

    pokemonElement.style.backgroundColor = color;
    let pokeInnerHtml = `
    <div class="imageContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
    </div>`
    let info = `<div class = "info">
        <span class="number">#${pokemon.id.toString().padStart(3,'0')}
        </span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;
	let abilities  = pokemon.abilities.length == 0 ?
		`
	<h3 class="name">No Abilities</h3>
	`:
		`
	<h3 class ="name">Abilities</h3>
	`;
	pokemon.abilities.forEach((abi, ind)=>{
		abilities += `<br/><small class="type">${ind + 1}${". "}
		<span>${abi.ability.name.split('-').map(value => value.charAt(0).toUpperCase() + value.slice(1)).join(' ')}
			</span></small>`
	})

    pokemonElement.innerHTML = pokeInnerHtml + info;

    pokeContainer.appendChild(pokemonElement);

	pokemonElement.addEventListener('mouseenter', ()=>{
		pokemonElement.innerHTML = abilities;

	})
	pokemonElement.addEventListener('mouseleave', ()=>{
		pokemonElement.style.filter = 'none';
		pokemonElement.innerHTML = pokeInnerHtml + info;
	})

}
fetchPokemons();
