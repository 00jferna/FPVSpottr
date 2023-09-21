import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import spotsReducer from "./spots";
import groupReducer from "./groups";
import favoritesReducer from "./favorites";
import reviewsReducer from "./reviews";
import memberReducer from "./members";
import userReducer from "./profile";

const rootReducer = combineReducers({
  session,
  spots: spotsReducer,
  groups: groupReducer,
  favorites: favoritesReducer,
  reviews: reviewsReducer,
  members: memberReducer,
  user: userReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
