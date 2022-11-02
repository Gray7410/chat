import "./App.css";
import MainLayout from "./app/layouts/main";
import LoginLayout from "./app/layouts/login";
import NavBar from "./app/components/navBar";
import { useDispatch, useSelector } from "react-redux";
import { auth, isLogin } from "./app/store/chat";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLogin());
  useEffect(() => {
    if (sessionStorage.length) {
      const user = sessionStorage.getItem("currentUser");
      const room = sessionStorage.getItem("currentRoom");
      dispatch(auth({ user, room }));
    }
  }, []);
  return (
    <>
      <NavBar />
      {isLoggedIn ? <MainLayout /> : <LoginLayout />}
    </>
  );
}

export default App;
