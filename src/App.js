import About from "./containers/About/About";
import AddPost from "./containers/AddPost/AddPost";
import Contacts from "./containers/Contacts/Contacts";
import Header from "./components/Header/Header";
import Posts from "./containers/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullPost from "./containers/FullPost/FullPost";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Posts/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/add" element={<AddPost/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/posts/:id" element={<FullPost/>} />
        <Route render={() => <h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
