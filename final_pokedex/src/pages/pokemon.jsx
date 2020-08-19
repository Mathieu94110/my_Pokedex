import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../Components/App/Navbar/Navbar";
import Card from "../Components/App/Card/Card";
import { Button, Spinner } from "reactstrap";
import "../Components/App/App.css";
import { setPokemons } from "../redux/actions";

export default function Pokemon() {
  const dispatch = useDispatch(); // déclaration de dispatch pour l'utiliser dans le composant
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [Url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const Pokemon = useSelector((state) => state.pokemons); // récupérer les pokemons depuis le store

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
    console.log(pokemonsData);
    dispatch(setPokemons(pokemonsData)); // mettre à jour les pokemons dans le store
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
