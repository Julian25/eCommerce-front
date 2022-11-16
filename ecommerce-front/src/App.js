import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route index element= {<Home/>}/>
          <Route path='*' element= {<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
