import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//import logo from './logo.svg';

import './App.css';
import AppNavbar from './components/AppNavbar';
import AppHomepage from './components/AppHomepage'
import { Provider } from 'react-redux';
import store from './store';

//import { connect } from 'react-redux';
//import { getBranches } from './actions/branchActions';
import { loadUser } from './actions/authActions';
import AppAboutPage from './components/AppAboutPage';
import TopicPage from './components/TopicPage';
import ListTopics from './components/ListTopics';
import ListSubjects from './components/ListSubjects';
import AddSimPage from './components/AddSimPage';
import FileUploadPage from './components/FileUploadPage';
import RegisterPage from './components/Auth/RegisterPage';
import ConfirmMail from './components/Auth/ConfirmMail';
import Notification from 'react-notify-toast';
import NotFound from './components/NotFound';
import LoginPage from './components/Auth/LoginPage';
import RegisterModal from './components/Auth/RegisterModal';

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
              <Notification/>
              <Switch>
                <Route path="/" exact component={AppHomepage} />
                <Route path="/register/confirm/:id" exact component={ConfirmMail} />
                {/* <Route path="/register" exact component={RegisterPage} /> */}
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={RegisterModal} />
                <Route path="/about" exact component={AppAboutPage} />
                <Route path="/addSim" exact component={AddSimPage} />
                <Route path="/addSim/:simulation" exact component={FileUploadPage} />
                <Route path="/branch/:branch/:subject/:topic" component={TopicPage} />
                <Route path="/branch/:branch/:subject" component={ListTopics} />
                <Route path="/branch/:branch" component={ListSubjects} />

                <Route path="" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
