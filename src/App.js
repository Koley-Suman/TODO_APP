import { Route, Routes } from "react-router-dom";

import Auth from "./authentication/auth";

import Homepage from "./homePage/homepage";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserFromAuth,
  onAuthStateChanged_Listener,
} from "./utils/firebase/firebase";
import { setCurrentUser } from "./store/userSlice/userSlice";

import ResponsiveAppBar from "./components/muiNavber/muiNavber";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged_Listener((user) => {
      if (user) {
        createUserFromAuth(user);
      }
      console.log(user);
      dispatch(setCurrentUser(user));
    });
    
    return unsubscribe;
  }, []);

  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ResponsiveAppBar user={user} />}>
          <Route index element={<Homepage />} />
          <Route path="auth/*" element={<Auth />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
