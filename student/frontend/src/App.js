import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useSelector } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserDetails } from "./redux/users/actions";
import {
  Login,
  Topbar,
  Sidebar,
  Dashboard,
  ExamManagenemt,
  Notenspiegel,
  MyExams,
} from "./scenes";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      store.dispatch(getUserDetails());
    }
  }, [isAuthenticated]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar user={user} isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && (
              <Topbar user={user} setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/exam-managenemt"
                element={
                  <ProtectedRoute>
                    <ExamManagenemt />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/anmeldeliste"
                element={
                  <ProtectedRoute>
                    <MyExams />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notenspiegel"
                element={
                  <ProtectedRoute>
                    <Notenspiegel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
