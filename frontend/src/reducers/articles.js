const initialState = [
];

export default function articles(state = initialState, action) {
    let articleList = state.slice();

    switch(action.type) {
        // case 'ADD_ARTICLE':
        //     return [...state, {text: action.text}];
        case 'ADD_ARTICLE':
            return [...state, action.article];
        case 'UPDATE_ARTICLE':
            let articleToUpdate = articleList[action.index];
            articleToUpdate.text = action.article.text;
            articleList.splice(action.index, 1, articleToUpdate);
            return articleList;
        case 'DELETE_ARTICLE':
            articleList.splice(action.index, 1);
            return articleList;
        case 'FETCH_ARTICLES':
            return [...state, ...action.articles];
        default:
            return state
    }
}