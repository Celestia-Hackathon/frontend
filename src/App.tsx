import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Profile from './pages/Profile'
import Navigate from './pages/Navigate'

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
      <BrowserRouter >
        <Routes >
          <Route path="/" element={<Layout />} >
            <Route path='/' element={<Navigate />} />
            <Route path='/feed' element={<Home />} />
            <Route path='profile/:id' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
