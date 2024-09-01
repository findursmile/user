import './App.css'
import Header from './components/Header'
import Banner from './components/Banner'
import Gallery from './components/Gallery'
import GetMySmiles from './components/GetMySmiles'
import { useState } from 'react'

function App() {
    const [viewMode, setViewMode] = useState('all');
    const [encodings, setEncodings] = useState([]);
  return (
    <>
        <Header />
        <main>
            <section className="container mx-auto">
                <Banner onViewChange={(t:string) => setViewMode(t)}/>
            </section>
            <section className="container mx-auto">
                { viewMode === "mine" ? <GetMySmiles onGetEncodings={setEncodings} /> : ''}
                <Gallery encodings={encodings} />
            </section>
        </main>
    </>
  )
}


export default App
