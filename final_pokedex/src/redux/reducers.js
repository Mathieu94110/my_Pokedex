const initialState = {
  pokemons: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setPokemons":
      return {
        ...state,
        pokemons: action.pokemons,
      };
    default:
      return state;
  }
};

export default reducer;
