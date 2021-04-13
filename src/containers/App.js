import React from "react";
import { Route, Switch } from "react-router";
import Header from "../components/Header";
import HomePage from "./HomePage";
import ResultsPage from "./ResultsPage";
import NotFoundPage from "./NotFoundPage";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/results" component={ResultsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;
