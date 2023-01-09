import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useSelector } from 'react-redux';
import NewProducts from './pages/New products/NewProducts';

function App() {

  const user = useSelector((state) => state.user)
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route index element= {<Home/>}/>
          {!user && (
            <>
              <Route path = '/login' element= {<Login/>}/>
              <Route path = '/signup' element= {<Signup/>}/>
            </>
          )}
          <Route path='/new-product' element= {<NewProducts/>}/>
          <Route path='*' element= {<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
