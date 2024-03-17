import { PureComponent } from "react";
import todos from "./../../service/todos";
import { DEFAULT_TODO } from "../../constants/todos";
import "./style.sass";

export default class List extends PureComponent {
  constructor() {
    super();

    this.handleTitle = this.handleTitle.bind(this);
    this.handleCompleteNewTodo = this.handleCompleteNewTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    list: [],
    newTodo: DEFAULT_TODO,
  };

  async componentDidMount() {
    try {
      let response = await todos.get();

      this.setState({
        list: response.slice(0, 10),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async handleDelete(id) {
    try {
      await todos.delete(id);

      this.setState((actualState) => ({
        list: actualState.list.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async handleComplete(item) {
    try {
      let response = await todos.patch(item.id, { completed: !item.completed });

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

  handleTitle(event) {
    this.setState((actualState) => ({
      newTodo: { ...actualState.newTodo, title: event.target.value },
    }));
  }

  handleCompleteNewTodo(event) {
    this.setState((actualState) => ({
      newTodo: { ...actualState.newTodo, completed: event.target.checked },
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await todos.post(this.state.newTodo);

      this.setState(
        (actualState) => ({
          list: [...actualState.list, response],
        }),
        () => {
          this.setState({
            newTodo: DEFAULT_TODO,
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { list, newTodo } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={newTodo.title}
              onChange={this.handleTitle}
            />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={newTodo.completed}
              onChange={this.handleCompleteNewTodo}
            />
          </label>
          <button>Add todo</button>
        </form>
        {list.length ? (
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
                </label>
              </li>
            ))}
          </ul>
        ) : null}
      </>
    );
  }
}
