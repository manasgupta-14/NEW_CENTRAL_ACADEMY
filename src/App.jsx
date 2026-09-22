import { Routes, Route } from "react-router-dom"
import Home from "./Components/Home"
import ActivitiesPage from "./Components/Activities/ActivitiesPage"
import ScrollToTop from "./Components/common/ScrollToTop"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/activities" element={<ActivitiesPage/>} />
      </Routes>
    </>
  )
}
export default App
