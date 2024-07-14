import { configureStore } from "@reduxjs/toolkit";
import { userReducer, usersReducer } from "./users/reducers";
import { examReducer } from "./exams/reducers";
import { anmeldeListeReducer } from "./anmeldeList/reducers";
import { notenspiegelReducer } from "./notenspiegel/reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
    anmeldeListe: anmeldeListeReducer,
    notenspiegel: notenspiegelReducer,
    users: usersReducer,
  },
});

export default store;
