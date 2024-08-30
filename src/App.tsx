import './App.css'
import Header from './components/Header'
import Banner from './components/Banner'
import Gallery from './components/Gallery'

function App() {
  return (
    <>
        <Header />
        <main>
            <section className="container mx-auto">
                <Banner />
            </section>
            <Gallery />
        </main>
    </>
  )
}

export default App
