import React, {Component} from 'react';
import {connect} from 'react-redux';
import {articlesActions, authActions} from '../actions';

class Main extends Component{
    componentDidMount(){
        this.props.fetchArticles();
    }

    state = {
        text: "",
        updateArticleId: null
    };

    submitArticle = (e) => {
        e.preventDefault();
        if(this.state.updateArticleId === null){
            this.props.addArticle(this.state.text).then(this.resetForm);
        }
        else {
            this.props.updateArticle(this.state.updateArticleId, this.state.text).then(this.resetForm);
        }
    };

    resetForm = () => {
        this.setState({text: "", updateArticleId: null});
    };

    selectForEdit = (id) => {
        let article = this.props.articles[id];
        this.setState({updateArticleId: id, text: article.text});
    };


    render(){
        return(
        <div>
            <h3>ПОСТЫ:</h3>
            <hr/>
            <div style = {{textAlign: "right"}}>
                {this.props.user.username} (<a onClick={this.props.logout}>Выйти</a> )
            </div>
            <h2>Создать пост</h2>
            <form onSubmit={this.submitArticle}>
                <textarea cols="40"
                    value = {this.state.text}
                    placeholder="Пиши пост сюда"
                    onChange={(e) => this.setState({text: e.target.value})}
                    required
                    />
                <button onClick={(e)=>"submit"}>Добавть пост</button>

            </form>
            <br/>
            {this.props.articles.map((article, id) =>(
                <div key={`article_${id}`}>
                    <h2>Статья</h2>
                    {article.text}
                    <hr/>
                    <button onClick={() => this.selectForEdit(id)}>Редактировать</button>
                    <button onClick={() => this.props.deleteArticle(id)}>Удалить</button>
                </div>
            ))}
        </div>)

    }

}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        user: state.authReducers.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // addArticle: (text) => {
        //     dispatch(articlesActions.addArticle(text));
        // },
        updateArticle: (id, text) => {
           return dispatch(articlesActions.updateArticle(id, text));
        },
        deleteArticle: (id) => {
            dispatch(articlesActions.deleteArticle(id));
        },
        fetchArticles: () => {
            dispatch(articlesActions.fetchArticles());
        },
        addArticle: (text) => {
           return dispatch(articlesActions.addArticle(text));
        },
        logout: () => dispatch(authActions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);