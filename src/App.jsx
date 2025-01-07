import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <h1>HOME</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
