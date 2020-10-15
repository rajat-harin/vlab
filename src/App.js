import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import AppHomepage from './components/AppHomepage'
import { Provider } from 'react-redux';
import store from './store';

//import { connect } from 'react-redux';
//import { getBranches } from './actions/branchActions';
import { loadUser } from './actions/authActions';
import AppAboutPage from './components/AppAboutPage';
import ListSubject from './components/ListSubject';
import TopicPage from './components/TopicPage';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (

      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div style={{ marginTop: 50 }}>
              <Switch>
                <Route path="/" exact component={AppHomepage} />
                <Route path="/about" exact component={AppAboutPage} />
                <Route path="/branch/:branch/:topic" component={TopicPage} />
                <Route path="/branch/:branch" component={ListSubject} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
