/*
Name: Becca Miller
Date: April 7, 2026

Description:
This app fetches country data from the REST Countries API.
It filters and displays countries that have at least one neighboring country
starting with the letter A or I.
*/

import { useEffect, useState } from "react";
import NeighborsA from "./NeighborsA";
import NeighborsI from "./NeighborI";
import "./App.css";

function App() {
  // Store all countries from the API
  let [countries, setCountries] = useState([]);

  // Store country codes and matching official country names
  let [countryCodes, setCountryCodes] = useState({});

  // Store filtered countries for display
  let [filteredCountries, setFilteredCountries] = useState([]);

  // Store which button was clicked
  let [selected, setSelected] = useState("");

  // Fetch country data when the component loads
  useEffect(() => {
    let getCountries = async () => {
      let response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3"
      );

      let data = await response.json();
      setCountries(data);

      let codeMap = {};

      data.forEach((country) => {
        codeMap[country.cca3] = country.name.official;
      });

      setCountryCodes(codeMap);
    };

    getCountries();
  }, []);

  // Filter countries based on whether one of their neighbors starts with a chosen letter
  let getCountriesWithNeighborStartingWith = (letter) => {
    let filteredList = countries.filter((country) => {
      if (!country.borders) {
        return false;
      }

      return country.borders.some((code) => {
        let neighborName = countryCodes[code];
        return neighborName && neighborName.startsWith(letter);
      });
    });

    return filteredList;
  };

  // Display countries with neighbors starting with A
  let handleAButton = () => {
    let results = getCountriesWithNeighborStartingWith("A");
    setFilteredCountries(results);
    setSelected("A");
  };

  // Display countries with neighbors starting with I
  let handleIButton = () => {
    let results = getCountriesWithNeighborStartingWith("I");
    setFilteredCountries(results);
    setSelected("I");
  };

  return (
    <div className="container">
      <h1>Neighboring Countries</h1>

      <button onClick={handleAButton}>NEIGHBORS STARTING WITH A</button>
      <button onClick={handleIButton}>NEIGHBORS STARTING WITH I</button>

      <div className="results">
        {selected === "" && <p>Click a button to see results.</p>}

        {selected === "A" && (
          <NeighborsA
            countries={filteredCountries}
            countryCodes={countryCodes}
          />
        )}

        {selected === "I" && (
          <NeighborsI
            countries={filteredCountries}
            countryCodes={countryCodes}
          />
        )}
      </div>
    </div>
  );
}

export default App;
