import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound404 from './components/NotFound404';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import BoardsPage from './components/BoardsPage';
import BoardNotesPage from './components/BoardNotesPage';

class App extends React.Component {

  // componentWillMount(){
  //   const token = localStorage.getItem('noteboards_t');
  //   if(token){
  //     store.dispatch({type:AUTH_USER_SIGNIN_SUCCESS, payload:{user:{}, access_token:token}});
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" render={(routeProps) => { routeProps.history.push('/home')}} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/signin" component={SignInPage} />
              <Route exact path="/board/:boardId" component={BoardNotesPage} />
              <Route exact path="/boards" component={BoardsPage} />
              <Route component={NotFound404} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;