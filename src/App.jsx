import "./App.css"
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import HomePage from "./components/Home/HomePage"
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/tasks"}/>}/>
          <Route path="/tasks" element={<HomePage/>}/>
          <Route path="/tasks/:id" element={<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
