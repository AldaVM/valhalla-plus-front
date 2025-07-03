import "./App.css";
import { AuthProvider } from "./context/auth/AuthContext";
import Router from "./Router";

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
