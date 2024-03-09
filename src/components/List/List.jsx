import { Component } from "react";

// eslint-disable-next-line react/prefer-stateless-function
class List extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props };

    setTimeout(() => {
      this.setState((prevState) => ({
        list: [...prevState.list, "Kyiv"],
        color: "lightpink",
      }));
    }, 1000);
  }

  render() {
    const { list = [], color } = this.state;

    return list.length ? (
      <ul style={{ backgroundColor: color }}>
        {list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : null;
  }
}

export default List;
