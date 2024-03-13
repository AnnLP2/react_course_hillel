import { Component } from "react";
import AnimalTable from "./components/AnimalTable/AnimalTable";

export default class App extends Component {
  state = {
    animals: [
      { type: `turtle`, icon: `🐢` },
      { type: `octopus`, icon: `🐙` },
      { type: `fish`, icon: `🐠` },
      { type: `flamingo`, icon: `🦩` },
      { type: `penguin`, icon: `🐧` },
    ],
  };

  render() {
    const { animals } = this.state;

    return (
      <>
        <AnimalTable animals={animals} />
      </>
    );
  }
}
