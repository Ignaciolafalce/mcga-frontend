import React from 'react';
import Layout from './components/Layout'
import {BrowserRouter, Switch} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" render={(routeProps) => { return <div>Example route</div>}} />
            </Switch>
          </Layout>
        </BrowserRouter>
    );
  }
}

export default App;