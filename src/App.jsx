import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Show } from "./components/Show";
import { Create } from "./components/Create";
import { Edit } from "./components/Edit";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Contact } from "./components/Contact"
import { Admin } from "./components/Admin"
import { Login } from "./components/Login"
import { ChooseUsernameView } from "./components/ChooseUsername"
import { SignOut } from "./components/SignOut"
import { Comentarios } from "./components/Comentarios"

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/admin/edit/:id" element={<Edit />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/choose-username" element={<ChooseUsernameView />} /> 
          <Route path="/signout" element={<SignOut />} /> 
          <Route path="/comentarios" element={<Comentarios />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
