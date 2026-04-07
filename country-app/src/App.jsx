import { useEffect, useState } from "react";
import NeighborsA from "./NeighborsA";
import NeighborsI from "./NeighborI";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryCodes, setCountryCodes] = useState({});
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);

        const codeMap = {};

        data.forEach((country) => {
          codeMap[country.cca3] = country.name.official;
        });

        setCountryCodes(codeMap);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, []);

  const getCountriesWithNeighborStartingWith = (letter) => {
    return countries.filter((country) => {
      if (!country.borders) {
        return false;
      }

      return country.borders.some((code) => {
        const neighborName = countryCodes[code];
        return neighborName && neighborName.startsWith(letter);
      });
    });
  };

  const handleAButton = () => {
    setFilteredCountries(getCountriesWithNeighborStartingWith("A"));
    setSelected("A");
  };

  const handleIButton = () => {
    setFilteredCountries(getCountriesWithNeighborStartingWith("I"));
    setSelected("I");
  };

  return (
    <div
      style={{
        color: "black",
        backgroundColor: "white",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>Neighboring Countries</h1>

      <button
        onClick={handleAButton}
        style={{ margin: "10px", padding: "10px 15px" }}
      >
        NEIGHBORS STARTING WITH A
      </button>

      <button
        onClick={handleIButton}
        style={{ margin: "10px", padding: "10px 15px" }}
      >
        NEIGHBORS STARTING WITH I
      </button>

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
  );
}

export default App;
