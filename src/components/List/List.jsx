import { Component } from "react";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// eslint-disable-next-line react/prefer-stateless-function
class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [...props.list],
      color: Array(props.list.length).fill(props.color),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState((prevState) => ({
        list: [...prevState.list, "Kyiv"],
        color: Array(prevState.list.length + 1).fill("lightpink"),
      }));
    }, 1000);

    setTimeout(() => {
      this.setState((prevState) => ({
        list: [...prevState.list].sort(),
        color: prevState.list.map(getRandomColor),
      }));
    }, 3000);
  }

  render() {
    const { list = [], color } = this.state;

    return list.length ? (
      <ul>
        {list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li style={{ backgroundColor: color[index] }} key={index}>
            {item}
          </li>
        ))}
      </ul>
    ) : null;
  }
}

export default List;
