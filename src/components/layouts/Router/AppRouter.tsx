import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Comics from "src/pages/comics";
import Characters from "src/pages/characters"
import Stories from "src/pages/stories"
import Layout from "src/components/layouts//Layout";
import Header from "src/components/layouts/components/Header";
import Landing from 'src/pages/landing'
interface Props {}

const AppRouter: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Router>
        <Header />
        <Switch>
          <Route path="/comics" component={Comics} />
          <Route path="/characters" component={Characters}/>
          <Route path='/stories' component={Stories}/>
          <Route path="/" component={Landing}/>
        </Switch> 
      </Router>
    </Layout>
  );
};
export default AppRouter;
