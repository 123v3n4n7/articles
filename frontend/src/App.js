import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import NotFound from './components/NotFound';
import Login from "./components/Login";
import Register from './components/Register';
import mainApp from './reducers';
import {authActions} from './actions';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {connect} from 'react-redux';

let store = createStore(mainApp, applyMiddleware(thunk));

class RootContainerComponent extends Component{

    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render = {props => {
        if (this.props.authReducers.isLoading) {
            return <em>Loading...</em>;
        } else if (!this.props.authReducers.isAuthenticated) {
            return <Redirect to = "/login"/>;
        } else {
            return <ChildComponent {...props}/>
        }
        }}/>
    };
    render(){
        let {PrivateRoute} = this;
        return(
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path = "/" component = {Main}/>
                    <Route exact path = "/login" component={Login}/>
                    <Route exact path = "/register" component = {Register}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        authReducers: state.authReducers,
    }
};

const mapDispatchToProps = dispatch => {
    return{
    loadUser: () => {
        return dispatch(authActions.loadUser());
        }
    }
};

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
export default class App extends Component {
    render(){
        return (
            <Provider store = {store}>
                <RootContainer/>
            </Provider>
        )
    }
}




// class App extends Component {
//   render() {
//     return (
//       // <div className="App">
//       //   <header className="App-header">
//       //     <img src={logo} className="App-logo" alt="logo" />
//       //     <h1 className="App-title">Welcome to React</h1>
//       //   </header>
//       //   <p className="App-intro">
//       //     To get started, edit <code>src/App.js</code> and save to reload.
//       //   </p>
//       // </div>
//         <Provider store = {store}>
//             <BrowserRouter>
//                     <Switch>
//                         <Route exact path="/" component={Main}/>
//                         <Route exact path="/login" component={Login}/>
//                     </Switch>
//             </BrowserRouter>
//         </Provider>
//     );
//   }
// }
//
// export default App;
