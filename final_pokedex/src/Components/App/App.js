import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import NavBar from "./Navbar/Navbar";
import Card from "./Card/Card";
import { Button, Spinner } from "reactstrap";

function App() {
  const [Pokemon, setPokemon] = useState([]);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [Url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      let res_list = await axios.get(Url);
      let datas = res_list.data;
      console.log(datas);
      setPrevPage(datas.previous);
      setNextPage(datas.next);
      await pokemonsInfos(datas.results);
      setLoading(false);
    }
    fetchData();
  }, [Url]);

  let pokemonsInfos = async (data) => {
    let pokemonsData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemon_list = await axios.get(pokemon.url);
        let pokemonsinfos = pokemon_list.data;
        return pokemonsinfos;
      })
    );
    setPokemon(pokemonsData);
  };
  console.log(Pokemon);

  const goToPrevPage = async () => {
    setLoading(true);
    var datas = await axios.get(prevPage);
    console.log(datas);
    let data = datas.data;
    await pokemonsInfos(data.results);

    setPrevPage(data.previous);
    setNextPage(data.next);
    setLoading(false);
  };

  const goToNextPage = async () => {
    setLoading(true);
    var datas = await axios.get(nextPage);
    let data = datas.data;
    await pokemonsInfos(data.results);

    setPrevPage(data.previous);
    setNextPage(data.next);
    setUrl(nextPage);
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "black" }}>Chargement des pokemons</h2>
        <Spinner color="warning" style={{ alignItems: "center" }} />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <div className="btn">
          <Button
            color="danger"
            onClick={prevPage ? goToPrevPage : null}
            className="btn-prev"
          >
            Page précédente
          </Button>
          <Button
            color="warning"
            onClick={nextPage ? goToNextPage : null}
            className="btn-next"
          >
            Page suivante
          </Button>
        </div>
        <div class="pokemons_container">
          {Pokemon.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
