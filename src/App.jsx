import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Dataset1 from "./pages/dataset_1";
import Dataset2 from "./pages/dataset_2";
import Dataset3 from "./pages/dataset_3";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/dataset1/:id">
            <Dataset1 />
          </Route>
          <Route path="/dataset2/:id">
            <Dataset2 />
          </Route>
          <Route path="/dataset3/:id">
            <Dataset3 />
          </Route>
          <Route path="/dashboard/:id">
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
