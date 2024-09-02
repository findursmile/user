import './App.css'
import Header from './components/Header'
import Banner from './components/Banner'
import Gallery from './components/Gallery'
import GetMySmiles from './components/GetMySmiles'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function App() {
    const [viewMode, setViewMode] = useState('all');
    const [encodings, setEncodings] = useState([]);
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
  )
}


export default App
