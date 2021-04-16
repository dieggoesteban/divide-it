import React from "react";
import { Route, Switch } from "react-router";
import Header from "../components/Header";
import HomePage from "./HomePage";
import ResultsPage from "./ResultsPage";
import NotFoundPage from "./NotFoundPage";
import ParticipantDetailsPage from "./ParticipantDetailsPage";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/results" component={ResultsPage} />
                <Route path="/participant/:id" component={ParticipantDetailsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
};

export default App;
