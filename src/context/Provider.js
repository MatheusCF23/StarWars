import React, { useEffect, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [planet, setPlanets] = useState([]);
  useEffect(() => {
    const planeta = async () => {
      const REQUEST = await fetch('https://swapi.dev/api/planets');
      const DATA = await REQUEST.json();
      setPlanets(DATA);
    };
    planeta();
  }, []);
  return (
    <Context.Provider value={ { planet } }>
      <div>
        { children }
      </div>
    </Context.Provider>
  );
}

Provider.propTypes = {}.isRequired;

export default Provider;
