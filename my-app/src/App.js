import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Postform from './components/postform/Postform';
import Bloglist from './components/bloglist/Bloglist';
import Blogedit from './components/blogedit/Blogedit';
import Yourblogs from './components/yourblogs/Yourblogs';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/postform' element={<Postform/>}/>
      <Route path='/bloglist' element={<Bloglist/>}/>
      <Route path='blogedit/:id' element={<Blogedit/>}/>
      <Route path='yourblogs' element={<Yourblogs/>}/>

    </Routes>
    </Router>
    </>
  );
}

export default App;
