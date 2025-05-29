import './App.css'
import Quote from "./components/Quote";

function App() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-2">Random Advice</h1>
        <Quote />
      </main>

    </>
  )
}

export default App
