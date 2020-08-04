import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound404 from './components/NotFound404'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" render={(routeProps) => { return <div>Example route</div> }} />
              <Route Component={NotFound404} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;