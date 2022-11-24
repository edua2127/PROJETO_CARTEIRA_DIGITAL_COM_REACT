import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx'

import { Provider } from 'react-redux';
import {store} from './redux/store.ts'

import './styles/global.css'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
} 

export default App;
