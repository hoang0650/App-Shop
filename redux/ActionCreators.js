import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + 'leaders')
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};
const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});
const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});
// PRODUCT
export const fetchProducts = () => (dispatch) => {
  dispatch(productsLoading());
  return fetch(baseUrl + 'products')
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
};
const productsLoading = () => ({
  type: ActionTypes.PRODUCTS_LOADING
});
const productsFailed = (errmess) => ({
  type: ActionTypes.PRODUCTS_FAILED,
  payload: errmess
});
const addProducts = (products) => ({
  type: ActionTypes.ADD_PRODUCTS,
  payload: products
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const postComment = (productId, rating, author, comment) => (dispatch) => {
  var newcmt = { productId: productId, rating: rating, author: author, comment: comment, date: new Date().toISOString() };
  fetch(baseUrl + 'comments', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newcmt)
  })
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(cmt => dispatch(addComment(cmt)))
    .catch(error => dispatch(commentsFailed(error.message)));
};
const addComment = (newcmt) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newcmt
});
// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + 'promotions')
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};
const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});
const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
// favorites
export const postFavorite = (productId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(productId));
  }, 2000);
};
const addFavorite = (productId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: productId
});

export const deleteFavorite = (productId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: productId
});
//cart
export const postCart = (productId) => (dispatch) => {
  setTimeout(() => {
      dispatch(addCart(productId));
  }, 2000);
};
export const addCart = (productId) => ({
  type: ActionTypes.ADD_CART,
  payload: productId,
});

export const deleteCart = (productId) => ({
  type: ActionTypes.DELETE_CART,
  payload: productId
});