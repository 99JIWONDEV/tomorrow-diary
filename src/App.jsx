import './App.css'
import axios from "axios"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Choose from './pages/Choose'
import Write from './pages/Write'
import Loading from './pages/Loading'
import MyDiary from './pages/MyDiary'
import DiaryDetail from './pages/DiaryDetail'
import EditEmotion from './pages/EditEmotion'
import EditDiary from './pages/EditDiary'

function App() {
  // GET 요청
  axios.get("/diarys/detail?date=2024-05-13&userId=1").then(function(response){
    console.log(response.data.response.body.title)
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/editEmotion/:id" element={<EditEmotion />} />
        <Route path="/write" element={<Write />} />
        <Route path="/editDiary/:id" element={<EditDiary />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/myDiary" element={<MyDiary />} />
        <Route path="/myDiary/:id" element={<DiaryDetail />} />
      </Routes>
    </>
  )
}

export default App
