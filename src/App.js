import React from 'react';
import Layout from './components/Layout'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" render={(routeProps) => { return <div>Example route</div> }} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;