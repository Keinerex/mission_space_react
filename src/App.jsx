import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage";

function App() {
  return (
      <BrowserRouter>
        <>
          <Header></Header>
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/task">
                  <Route path=":taskId" element={<TaskPage/>}></Route>
              </Route>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/new_task" element={<CreateTaskPage/>}/>

          </Routes>
        </>
      </BrowserRouter>
  );
}

export default App;
