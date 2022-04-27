import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, About, Products, SignIn, SignUp, PageNotFound } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/clothing' element={<Products/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
