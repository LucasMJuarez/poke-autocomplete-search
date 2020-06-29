import React, { useState, useEffect } from "react";
import "./App.css";

const Autocomplete = () => {

  const [display, setDisplay] = useState([]);
  const [option, setOption] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const pokemon = [];
    const promises = new Array(150)
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));

    Promise.all(promises).then((pokeArray) => {
      return pokeArray.map((res) =>
        res
          .json()
          .then(
            ({
              name,
              sprites: { front_default: imagen, back_default: imagen2 },
            }) => {
              return pokemon.push({ name, imagen, imagen2 });
            }
          )
          .catch((error) => {
            console.log("Ha ocurrido un error", error);
          })
      );
    });
    setOption(pokemon);
  }, []);

  //Search

  const setPokeDex = (poke) => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div className="flex-container flex-column pos-rel">
      <input
        type="text"
        id="auto"
        placeholder="Type one Pokemon"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {option
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((v, i) => {
              return (
                <div
                  onClick={() => setPokeDex(v.name)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{v.name}</span>
                  <img src={v.imagen} alt="pokemon" />
                  <img src={v.imagen2} alt="pokemon" />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Autocomplete Search Pokemon</h1>
      <div className="auto-container">
        <Autocomplete />
      </div>
    </div>
  );
}

export default App;
