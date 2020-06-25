import React, {Fragment} from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './common/Home';
import Login from './authentication/Login';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './common/theme';
import Navbar from './common/Navbar';
import axios from 'axios'; 
import PrivateRoute from './authentication/PrivateRoute';
import EditorHome from './editor/EditorHome';
import EditorMD from './editor/EditorMD';
import Alerts from './common/Alerts';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Post from './common/Post';
import Search from './common/Search';
import RequestPost from './common/RequestPost';


function App() {

  const alertOptions = {
    timeout: 5000,
    position: 'bottom center'
  }

  axios.defaults.baseURL = 'http://127.0.0.1:8000';

  useEffect(()=>{store.dispatch(loadUser())}, []);

  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
    <CssBaseline />
    <Fragment>
    <Router>
    <Navbar/>
    <Alerts/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/post/:slug" component={Post}/>
        <Route exact path="/search/:title" component={Search}/>
        <Route exact path="/request-post" component={RequestPost}/>
        <PrivateRoute exact path="/ehome" component={EditorHome}/>
        <PrivateRoute exact path="/editor" component={EditorMD}/>
      </Switch>
    </Router>
    </Fragment>
    </AlertProvider>
    </ThemeProvider>
    </Provider>
  );
}

export default App;