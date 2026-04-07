/*
Name: Becca Miller
Date: April 7, 2026

Description:
This component displays countries that have at least one neighboring country
starting with the letter I.
*/

function NeighborsI(props) {
  return (
    <div>
      <h2>Results:</h2>

      {props.countries.map((country, index) => (
        <div className="country-card" key={index}>
          <h3>{country.name.official}</h3>

          <p>
            <strong>Capital:</strong> {country.capital?.[0] || "No capital listed"}
          </p>

          <img src={country.flags.png} alt={country.name.official} />

          <p>
            <strong>Neighbors:</strong>{" "}
            {country.borders
              ?.map((code) => props.countryCodes[code])
              .join(", ") || "No neighboring countries"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NeighborsI;