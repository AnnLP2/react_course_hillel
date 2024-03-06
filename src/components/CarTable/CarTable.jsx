import { Fragment } from "react";
import "./style.css";

const CarTable = ({ cars }) => {
  return (
    <table className="table">
      <tbody>
        {cars.map((car) => (
          <Fragment key={car.id}>
            <tr className="row__brand">
              <td colSpan="2">
                {car.brand}
              </td>
            </tr>
            {car.models.map((model) =>
              model.collection.map((item, i) => (
                <Fragment key={item.id}>
                  <tr>
                    {i === 0 && (
                      <td
                        rowSpan={model.collection.length}
                        className="cell__model"
                      >
                        {model.name}
                      </td>
                    )}
                    <td style={{paddingRight: "40px"}}>
                      <ul>
                        <li>Version: {item.version}</li>
                        <li>Year: {item.year}</li>
                        <li>Horsepower: {item.horsepower}</li>
                        <li>Engine: {item.engine}</li>
                      </ul>
                    </td>
                  </tr>
                </Fragment>
              ))
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
