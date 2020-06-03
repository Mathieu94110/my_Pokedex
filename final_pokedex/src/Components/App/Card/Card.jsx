import React from "react";
import "./Card.css";
function Card({ pokemon }) {
  return (
    <div className="Card">
      <div className="CardImage">
        <img src={pokemon.sprites.front_shiny} />
      </div>
      <div className="CardName">{pokemon.name}</div>
      <div className="CardTypes">
        {pokemon.types.map((type) => {
          return <div className="CardType">{type.type.name}</div>;
        })}
      </div>

      <div className="CardInfo">
        <div className="CardData CardDataWeight">
          <p>Poids</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="CardData CardDataHeight">
          <p>Taille</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="CardData CardDataAbility">
          <p>Types</p>
          <p>{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
