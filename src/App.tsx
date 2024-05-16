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
import New from './pages/New'

function App() {
  const blankUser: User = {
    name: "",
    userName: "",
    userId: "",
    followers: [""],
    following: [""],
    bio: "",
    avatarImg: "",
    bannerImg: "",
    wallet: "",
    tokens: 0,
    postsId: [""],
    nfts: [],
    badges: []
  }

  const blankPost: Post = {
    postId: "",
    userId: "",
    userName: "",
    avatarImg: "",
    postImg: "",
    caption: "",
    likes: [""],
    comments: [""],
    createdAt: ""
  }

  const blankQuest: Quest = {
    questId: "",
    questName: "",
    questDescription: "",
    reward: 0,
    createdBy: "",
    completedBy: [""],
    createdAt: "",
    dueDate: "",
    applicantsId: [""]
  }

  const [users, setUsers] = useState<User[]>([blankUser]);
  const [posts, setPosts] = useState<(Post | MarketPlacePost)[]>([blankPost]);
  const [quests, setQuests] = useState<Quest[]>([blankQuest]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://chatspace-backend.vercel.app/api/get-posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("error getting posts data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://chatspace-backend.vercel.app/api/get-users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("error getting users data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getThirtyTwoRandomImgs = () => {
      const shuffledImg = gachaImgs.sort(() => 0.5 - Math.random());
      const images1 = shuffledImg.slice(0, 21);
      const images2 = shuffledImg.slice(22, 31);
      localStorage.setItem('images1', JSON.stringify(images1));
      localStorage.setItem('images2', JSON.stringify(images2));
    }

    getThirtyTwoRandomImgs();
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch("https://chatspace-backend.vercel.app/api/get-quests");
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setQuests(data);
        } else {
          console.error("error getting quests data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuests();
  }, []);

  const memoizedUsers = useMemo(() => users, [users]);
  const memoizedPosts = useMemo(() => posts, [posts]);
  const memoizedQuests = useMemo(() => quests, [quests]);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
      <BrowserRouter >
        <Routes >
          <Route path="/" element={<Layout />} >
            <Route path='/' element={<Navigate />} />
            <Route path='feed' element={<Home users={memoizedUsers} posts={memoizedPosts} />} />
            <Route path='profile/:id' element={<Profile users={memoizedUsers} posts={memoizedPosts} />} />
            <Route path='gacha' element={<Gacha />} />
            <Route path='marketplace' element={<Marketplace posts={memoizedPosts} />} />
            <Route path='explore/:device' element={<ExploreHub posts={memoizedPosts} />} />
            <Route path='quests' element={<Quests quests={memoizedQuests} />} />
            <Route path='new' element={<New users={memoizedUsers} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
