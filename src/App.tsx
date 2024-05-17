import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { useState, useEffect, useMemo } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { User, Post, MarketPlacePost, Quest } from './utils/types'
import { gachaImgs } from './utils/gacha'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Profile from './pages/Profile'
import Navigate from './pages/Navigate'
import Gacha from './pages/Gacha'
import Marketplace from './pages/Marketplace'
import ExploreHub from './pages/ExploreHub'
import Quests from './pages/Quests'
import Register from './pages/Register';

import {api} from './utils/api';
import { blankUser, blankPost, blankQuest } from './utils/blank';
import NewMarketplacePost from './pages/NewMarketplacePost'
import NewMarketplacePostIndex from './pages/NewMarketplacePostIndex'


function App() {
  const [users, setUsers] = useState<User[]>([blankUser]);
  const [posts, setPosts] = useState<(Post | MarketPlacePost)[]>([blankPost]);
  const [quests, setQuests] = useState<Quest[]>([blankQuest]);

  useEffect(() => {
    api.fetchPosts().then((data) => setPosts(data))
  }, []);

  useEffect(() => {
    api.fetchUserData().then((data) => setUsers(data))

    const getThirtyTwoRandomImgs = () => {
      const shuffledImg = gachaImgs.sort(() => 0.5 - Math.random());
      const images1 = shuffledImg.slice(0, 21);
      const images2 = shuffledImg.slice(22, 31);
      localStorage.setItem('images1', JSON.stringify(images1));
      localStorage.setItem('images2', JSON.stringify(images2));
    }

    getThirtyTwoRandomImgs();
  }, []);

  useEffect(() => {
    api.fetchQuests().then((data) => setQuests(data))
  }, []);

  const memoizedUsers = useMemo(() => users, [users]);
  const memoizedPosts = useMemo(() => posts, [posts]);
  const memoizedQuests = useMemo(() => quests, [quests]);

  return (
    
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
      <BrowserRouter >
        <Routes >
          <Route path='/' element={<Navigate />} />
          <Route path='register' element = {<Register />} />
          <Route path="/" element={<Layout />} >
            <Route path='feed' element={<Home users={memoizedUsers} posts={memoizedPosts} />} />
            <Route path='profile/:id' element={<Profile users={memoizedUsers} posts={memoizedPosts} />} />
            <Route path='gacha' element={<Gacha />} />
            <Route path='marketplace' element={<Marketplace posts={memoizedPosts} />} />
            <Route path='explore/:device' element={<ExploreHub posts={memoizedPosts} />} />
            <Route path='quests' element={<Quests quests={memoizedQuests} />} />
            <Route path='newmarketplace' element={<NewMarketplacePost  />} />
            <Route path='newmarketplace/create' element={<NewMarketplacePostIndex  />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
