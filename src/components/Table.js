import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { planet, filter } = useContext(Context);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {planet.results ? planet.results
          .filter((plan) => plan.name.includes(filter))
          .map((plan) => (
            <tr key={ plan.name }>
              <td>{plan.name}</td>
              <td>{plan.rotation_period}</td>
              <td>{plan.orbital_period}</td>
              <td>{plan.diameter}</td>
              <td>{plan.climate}</td>
              <td>{plan.gravity}</td>
              <td>{plan.terrain}</td>
              <td>{plan.surface_water}</td>
              <td>{plan.population}</td>
              <td>{plan.films}</td>
              <td>{plan.created}</td>
              <td>{plan.edited}</td>
              <td>{plan.url}</td>
            </tr>
          )) : null}
        ;
      </tbody>
    </table>
  );
}

export default Table;
