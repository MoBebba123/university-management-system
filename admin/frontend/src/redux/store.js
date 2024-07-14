import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/reducers";
import { studiengangReducer } from "./studiengang/reducers";
import { professorReducer } from "./professor/reducers";
import { studentReducer } from "./student/reducers";
import { placesReducer } from "./places/reducers";
import { merchantReducer } from "./merchant/reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    merchant: merchantReducer,
    places: placesReducer,
    studiengang: studiengangReducer,
    professor: professorReducer,
    student: studentReducer,
  },
});

export default store;
