import { Component } from "react";

export default class List extends Component {
  state = {
    list: [],
  };

  async componentDidMount() {
    try {
      let request = await fetch(
          "https://65ef5bb3ead08fa78a5055fb.mockapi.io/todos"
        ),
        response = await request.json();

      this.setState({
        list: response,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async handleDelete(id) {
    try {
      await fetch(`https://65ef5bb3ead08fa78a5055fb.mockapi.io/todos/${id}`, {
        method: "DELETE",
      });

      this.setState((actualState) => ({
        list: actualState.list.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async handleComplete(item) {
    try {
      let request = await fetch(
          `https://65ef5bb3ead08fa78a5055fb.mockapi.io/todos/${item.id}`,
          {
            method: "PUT",
            body: JSON.stringify({ completed: !item.completed }),
            headers: {
              "Content-type": "application/json",
            },
          }
        ),
        response = await request.json();

      this.setState((actualState) => ({
        list: actualState.list.map((elem) => {
          if (elem.id === response.id) elem = response;
          return elem;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async handleTitleChange(event, id) {
    try {
      let request = await fetch(
          `https://65ef5bb3ead08fa78a5055fb.mockapi.io/todos/${id}`,
          {
            method: "PUT",
            body: JSON.stringify({ title: event.target.value }),
            headers: {
              "Content-type": "application/json",
            },
          }
        ),
        response = await request.json();

      this.setState((actualState) => ({
        list: actualState.list.map((elem) => {
          if (elem.id === response.id) elem = response;
          return elem;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { list } = this.state;

    return list.length ? (
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.title}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => this.handleDelete(item.id)}
            >
              Delete
            </button>
            <label>
              <input
                type="checkbox"
                defaultChecked={item.completed}
                onChange={() => this.handleComplete(item)}
              />
              <input
                type="text"
                defaultValue={item.title}
                onChange={(event) => this.handleTitleChange(event, item.id)}
              />
            </label>
          </li>
        ))}
      </ul>
    ) : null;
  }
}
