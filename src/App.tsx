import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DataContextProvider } from './store/DataContext';


import { Home } from './pages/Home';

function App() {
  return (
    <DataContextProvider>
      <div className="App">
        <Home />
      </div>
    </DataContextProvider>
  );
}

export default App;
