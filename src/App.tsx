import React, { useEffect, useState } from 'react';
import './App.css';
import Globe from 'react-globe.gl';

function App() {
  const [countries, setCountries] = useState({ features: []});

    useEffect(() => {
      // load data
      fetch("./ne_110m_admin_0_countries.geojson")
        .then((res) => {
          console.log('res :>> ', res);
          return res.json();
        })
        .then((fetchedCountries) => {
          console.log("fetchedCountries :>> ", fetchedCountries);
          setCountries(fetchedCountries);
        });
    }, []);

    return (
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonUseDots={true}
        backgroundColor="#FFF"
        onZoom={() => false}
        hexPolygonColor={({properties : d}: any) => d.POLYGON_COLOR || "#FFF"}
        // hexPolygonColor={() =>
        //   `#${Math.round(Math.random() * Math.pow(2, 24))
        //     .toString(16)
        //     .padStart(6, "0")}`
        // }
        hexPolygonLabel={({ properties: d }: any) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Population: <i>${d.POP_EST}</i>
      `}
      />
    );

}

export default App;
