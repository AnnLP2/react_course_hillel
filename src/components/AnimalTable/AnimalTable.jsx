import { Component } from "react";
import "./style.sass";

class AnimalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      activeIndexes: [],
      borderWidth: null,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.selectRandomAnimal();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  selectRandomAnimal() {
    const { animals, activeIndexes } = this.state;
    const availableIndexes = animals
      .map((_, index) => index)
      .filter((index) => !activeIndexes.includes(index));

    if (availableIndexes.length === 0) return;

    const randomIndex =
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const selectedAnimal = animals[randomIndex];

    selectedAnimal.isActive = true;
    const updatedActiveIndexes = [...activeIndexes, randomIndex];

    this.setState(
      {
        animals: [...animals],
        activeIndexes: updatedActiveIndexes,
      },
      () => {
        if (updatedActiveIndexes.length === Math.ceil(animals.length / 2)) {
          this.setState({ borderWidth: "10px" });
        }

        if (updatedActiveIndexes.length === animals.length) {
          this.setState({ borderWidth: "20px" });
          clearInterval(this.interval);
        }
      }
    );
  }

  render() {
    return (
      <table className="table" style={{ borderWidth: this.state.borderWidth }}>
        <tbody>
          {this.state.animals.map((animal, index) => (
            <tr className={animal.isActive ? "active" : ""} key={index}>
              <td>{animal.type}</td>
              <td>{animal.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default AnimalTable;
