const stats = document.getElementById("stats");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const spriteContainer = document.getElementById("sprite-container");
const pokemonName = document.getElementById("name");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

/*Functions*/
const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // Reset Stats
  pokemonName.textContent = '';
  pokemonID.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

const getPokemon = async () => {
  
  try {
    console.log('lalal')
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await response.json();

    // Set the Information
    
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
    
    // types.innerHTML = data.types.map((obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`).join('');
    
    // Set the stats
    height.textContent = `${data.height}`;
    weight.textContent = `${data.weight}`;
  
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;

    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set the types
   

  } catch(err) {
    resetDisplay();
    alert("Pokémon not found");
  }
};



/* Event Listeners */
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getPokemon();
});


/*ANIMATION*/
stats.onmousemove = e => {
  for (const stat of document.getElementsByClassName("stat")) {
    const rect = stat.getBoundingClientRect(), 
    x = e.clientX - rect.left, 
    y = e.clientY - rect.top;

    stat.style.setProperty("--mouse-x", `${x}px`);
    stat.style.setProperty("--mouse-y", `${y}px`);
  }
}