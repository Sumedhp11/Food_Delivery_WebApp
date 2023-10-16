import "./App.css";
import Body from "./components/Body";
import store from "./utils/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Body />
      </div>
    </Provider>
  );
}

export default App;
