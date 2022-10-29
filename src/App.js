import "./App.css";
import MainLayout from "./app/layouts/main";
import LoginLayout from "./app/layouts/login";
import NavBar from "./app/components/navBar";
import { useSelector } from "react-redux";
import { isLogin } from "./app/store/chat";

function App() {
  const isLoggedIn = useSelector(isLogin());
  return (
    <>
      <NavBar />
      {isLoggedIn ? <MainLayout /> : <LoginLayout />}
    </>
  );
}

export default App;
