import List from "./components/List/List";

function App() {
  const towns = ["Kharkiv", "Mykolaiv", "Lviv", "Poltava"];

  return (
    <div className="App">
      <List list={towns} color="lightblue" />
    </div>
  );
}

export default App;
