import { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { data, filter, saveFilter } = useContext(Context);

  const filterTable = () => {
    const FILTER = data.filter((element) => element.name.toUpperCase()
      .includes(filter.toUpperCase()));
    const numberName = FILTER.filter((item) => {
      const result = saveFilter.map(({ column, operator, number }) => {
        switch (operator) {
        case 'menor que':
          return +item[column] < +number;
        case 'maior que':
          return +item[column] > +number;
        case 'igual a':
          return +item[column] === +number;
        default:
          return true;
        }
      });
      return result.every((e) => e);
    });
    return numberName;
  };

  return (
    <div>
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
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {
            filterTable().map((element) => (
              <tr key={ element.name }>
                <td>{element.name}</td>
                <td>{element.rotation_period}</td>
                <td>{element.orbital_period}</td>
                <td>{element.diameter}</td>
                <td>{element.climate}</td>
                <td>{element.gravity}</td>
                <td>{element.terrain}</td>
                <td>{element.surface_water}</td>
                <td>{element.population}</td>
                <td>{element.films.map((movie) => <div key={ movie }>movie</div>)}</td>
                <td>{element.created}</td>
                <td>{element.edited}</td>
                <td>{element.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
