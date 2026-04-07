function NeighborsI({ countries, countryCodes }) {
  return (
    <div>
      <h2>Results:</h2>

      {countries.map((country, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <h3>{country.name.official}</h3>
          <p>Capital: {country.capital?.[0]}</p>
          <img src={country.flags.png} width="120" />

          <p>
            Neighbors:{" "}
            {country.borders
              ?.map((code) => countryCodes[code])
              .join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NeighborsI;