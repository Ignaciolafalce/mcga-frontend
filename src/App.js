import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import NotFound404 from './components/shared/NotFound404';
import HomePage from './components/pages/HomePage';
import SignInPage from './components/pages/SignInPage';
import BoardsPage from './components/pages/BoardsPage';
import BoardNotesPage from './components/pages/BoardNotesPage';
import AuthWrapper from './components/shared/AuthWrapper';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AuthWrapper>
            <Layout>
              <Switch>
                <Route exact path="/" render={(routeProps) => { return routeProps.history.push('/home') }} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/signin" component={SignInPage} />
                <Route exact path="/board/:boardId" component={BoardNotesPage} />
                <Route exact path="/boards" component={BoardsPage} />
                <Route component={NotFound404} />
              </Switch>
            </Layout>
          </AuthWrapper>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;