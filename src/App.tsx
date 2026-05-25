import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import MainPage from './pages/MainPage'
import UsersPage from './pages/UsersPage'
import UserCardPage from './pages/UserCardPage'
import PostsPage from './pages/PostPage'
import PostCardPage from './pages/PostCardPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/users' element={<UsersPage/>}></Route>
        <Route path='/users/:id' element={<UserCardPage/>}></Route>
        <Route path='/posts' element={<PostsPage/>}></Route>
        <Route path='/posts/:id' element={<PostCardPage/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
