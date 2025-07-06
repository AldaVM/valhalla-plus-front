import "./App.css";
import { AuthProvider } from "./context/auth/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Router from "./Router";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
