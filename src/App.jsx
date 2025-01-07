import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Dataset1 from "./pages/dataset_1";
import Dateset2 from "./pages/dataset_2";
import Dataset3 from "./pages/dataset_3";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/dataset1">
            <Dataset1 />
          </Route>
          <Route path="/dataset2">
            <Dateset2 />
          </Route>
          <Route path="/dataset3">
            <Dataset3 />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
