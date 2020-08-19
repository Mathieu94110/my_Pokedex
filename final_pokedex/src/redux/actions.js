const setPokemons = (pokemonsData) => {
  return {
    type: "setPokemons",
    pokemons: pokemonsData,
  };
};

export { setPokemons };
