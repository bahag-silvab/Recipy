import { createRoot } from 'react-dom/client'
import './index.css'
import './index.css';
import MyRouter from './MyRouter.tsx'
import { RecipeProvider } from './context/RecipeContext.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <RecipeProvider>
      <MyRouter />
    </RecipeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
