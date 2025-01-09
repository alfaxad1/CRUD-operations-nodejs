import GetOneUser from "./components/GetOneUser";
import RegisterUser from "./components/RegisterUser";
import Users from "./components/Users";
import Update from "./components/Update";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<GetOneUser />}></Route>
        <Route path="/users/edit/:id" element={<Update />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
