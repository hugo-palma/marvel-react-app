import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import comics from "src/pages/comics";
import characters from "src/pages/characters"
import Layout from "src/components/layouts//Layout";
import Header from "src/components/layouts/components/Header";
interface Props {}

const AppRouter: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Router>
        <Header />
        <Switch>
          <Route path="/comics" component={comics} />
          <Route path="/characters" component={characters}/>
        </Switch> 
      </Router>
    </Layout>
  );
};
export default AppRouter;
