import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";
import {authActions} from "../actions";

class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.username, this.state.password);
    }

    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to = "/"/>
        }
        return(
            <form onSubmit = {this.onSubmit}>
                <fieldset>
                    <legend>Регистрация</legend>
                    {this.props.errors.length > 0 && (
                        <ul>
                            {this.props.errors.map(error => (
                                <li key = {error.field}>{error.message}</li>
                            ))}
                        </ul>
                    )}
                    <p>
                        <label htmlFor="username">Имя пользователя</label>
                        <input type ="text" id ="username"
                        onChange={e=>this.setState({username: e.target.value})}/>
                    </p>
                    <p>
                        <label htmlFor="password">Пароль</label>
                        <input type ="text" id ="password"
                        onChange={e=>this.setState({password: e.target.value})}/>
                    </p>
                    <p>
                        <button type = "submit">Зарегистрироваться</button>
                    </p>
                    <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
                </fieldset>
            </form>

        )
    }

}

const mapStateToProps = state => {
    let errors = [];
    if(state.authReducers.errors) {
        errors = Object.keys(state.authReducers.errors).map(field => {
            return {field, message: state.authReducers.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.authReducers.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        register: (username, password) => dispatch(authActions.register(username, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)