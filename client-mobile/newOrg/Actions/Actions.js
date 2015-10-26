// LOGIN: submit username/password to server for verification, and handle success or failure

var Network = require('../Services/Fetch');

exports.login = function(username, password) {
  // Thunk
  return function(dispatch) {
    console.log('trying to log in:', username, password);
    return Network.login(username, password)
      .then(function(response) {
        if (response.ok) {
          return response.json()
            .then(function(body) {
              return dispatch(loginSuccess(body));
            });
        } else {
          console.log(response);
          // TODO: show body text?
          return dispatch(loginFailure(response.statusText));
        }
      })
      .catch(function(error) {
        return dispatch(loginFailure(error.message));
      });
  };
};

// LOGIN_SUCCESS: set token, user, and household(optional) from server's response into store
function loginSuccess(data) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: {
      token: data.token,
      user: data.user,
      household: data.household,
    },
  };
}

// LOGIN_FAILURE: display error message?

function loginFailure(message) {
  return {
    type: 'LOGIN_FAILURE',
    payload: {message},
    error: true,
  };
}

// SIGNUP: submit username/password to server for creation of user; set token and user from server's response into store

exports.signup = function(username, password) {

  return function(dispatch) {
    return Network.signup(username, password)
      .then(function(response) {
        return response.json()
          .then(function(body) {
            console.log(body);
            if (response.ok) {
              return dispatch(signupSuccess(body));
            } else {
              return dispatch(signupFailure(body));
            }
          });
      })
      .catch(function(error) {
        console.log(error);
        return dispatch(signupFailure(error.message));
      });
  };
};

function signupSuccess(data) {
  return {
    type: 'SIGNUP_SUCCESS',
    payload: {
      token: data.token,
      user: data.user,
      household: null,
    },
  };
}

function signupFailure(message) {
  return {
    type: 'SIGNUP_FAILURE',
    payload: {message},
    error: true,
  };
}

// ENTRYMODE_LOGIN: set state.uiMode.entryMode to 'login'; navigate to login screen

// ENTRYMODE_SIGNUP: set state.uiMode.entryMode to 'signup'; navigate to signup screen

  // or, SET_ENTRY_MODE, with payload of 'login' or 'signup' ?
exports.setEntryMode = function(mode) {
  return {
    type: 'SET_ENTRY_MODE',
    payload: {mode},
  };
};

// HOMETAB_ITEMS: set state.uiMode.selectedHomeTab to 'items'; navigate to items view

// HOMETAB_RECKONINGS: set state.uiMode.selectedHomeTab to 'reckonings'; navigate to reckonings view

// HOMETAB_SETTINGS: set state.uiMode.selectedHomeTab to 'settings'; navigate to settings view

  // or, SET_HOMETAB, with payload of 'items', 'reckonings', or 'settings' ?
exports.setHomeTab = function(mode) {
  return {
    type: 'SET_HOME_TAB',
    payload: {mode},
  };
};

// ITEMSFILTER_PENDING: set state.uiMode.itemsFilter to 'pending'

// ITEMSFILTER_BOUGHT: set state.uiMode.itemsFilter to 'bought'

  // or, SET_ITEMS_FILTER, with payload of 'pending' or 'bought' ?
exports.setItemsFilter = function(mode) {
  return {
    type: 'SET_ITEMS_FILTER',
    payload: {mode},
  };
};

// GET_RECKONINGS: grab list of household's associated reckonings for display as list

// GET_HOME_ITEMS: grab list of household's current unreckoned items (split into bought and pending)
// and set into state.data.items.bought and state.data.items.pending

// SELECT_RECKONING: set state.uiMode.selectedReckoning to payload reckoning id
exports.selectReckoning = function(id) {
  return {
    type: 'SELECT_RECKONING',
    payload: {reckoningId: id},
  };
};

// GET_RECKONING_DATA: get associated users and items with reckoning; coordinate with server

// RECKONING_SELECT_ITEM: set state.uiMode.reckoningsSelectedItem to payload item id