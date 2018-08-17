// export const addArticle = text => {
//     return {
//         type: 'ADD_ARTICLE',
//         text
//     }
// }
// export const updateArticle = (id, text) => {
//     return{
//         type: 'UPDATE_ARTICLE',
//         id,
//         text
//     }
// }

export const fetchArticles = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().authReducers;
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        return fetch('/api/articles/', {headers, }).then(res => {
            if(res.status < 500) {
                return res.json().then(data => {
                    return {status: res.status, data};
                })
            } else {
                console.log("SERVER ERROR");
                throw res;
            }
        })
            .then(res => {
                if(res.status === 200) {
                    return dispatch({type: "FETCH_ARTICLES", articles: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}

export const addArticle = text => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().authReducers;
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let body = JSON.stringify({text});
        return fetch('/api/articles/', {method: "POST", headers, body})
            .then(res => {
                if(res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("SERVER ERROR");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 201){
                    return dispatch({type: "ADD_ARTICLE", article: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}


export const updateArticle = (index, text) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({text});
        let {token} = getState().authReducers;
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let articleId = getState().articles[index].id;
            return fetch(`/api/articles/${articleId}/`, {method: "PUT", headers, body})
                .then(res => {
                    if(res.status < 500){
                        return res.json().then(data => {
                            return {status: res.status, data};
                        })
                    } else {
                        console.log("SERVER ERROR");
                        throw res;
                    }
                }).then(res=>{
                    if(res.status === 200){
                        return dispatch({type: "UPDATE_ARTICLE", article: res.data, index});
                    } else if (res.status === 401 || res.status === 403) {
                        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                        throw res.data;
                    }
                })
    }
}

export const deleteArticle = (index) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let articleId = getState().articles[index].id;
        let {token} = getState().authReducers;
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
            return fetch(`api/articles/${articleId}/`, {method: "DELETE", headers})
                .then(res => {
                    if (res.status === 204){
                        return{status: res.status, data :{}};
                    } else if (res.status < 500) {
                        return res.json().then(data => {
                            return {status: res.status, data};
                        })
                    } else {
                        console.log("SERVER_ERROR");
                        throw res;
                    }
                })
                .then(res => {
                    if(res.status === 204){
                        return dispatch({type: "DELETE_ARTICLE", index});
                    }  else if (res.status === 401 || res.status === 403) {
                        dispatch({type:"AUTHENTICATION_ERROR", data: res.data});
                        throw res.data;
                    }
                })
    }
}