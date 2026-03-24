import { createRoot } from 'react-dom/client'
import './index.css'
import './index.css';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import MyRouter from './MyRouter';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <RecipeProvider>
      <MyRouter/>
    </RecipeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
