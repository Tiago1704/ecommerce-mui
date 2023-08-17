import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Registro from "./pages/registro/Registro";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./shared/firebaseConfig";
import ProdcutDetail from "./pages/porduct-detail/ProdcutDetail";

function App() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user)=> {
      setUser(user)
    });
    return () => {
      unsubscribe();
    };
  },[])

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        {user ? 
          <>
            <Route path="/" element={<Home />} /> 
            <Route path="/product/:id" element={<ProdcutDetail />} /> 
          </>
          : <Route path="/" element={<Navigate to="/login" />} />
          }
      </Routes>
    </BrowserRouter>
  );
}

export default App;