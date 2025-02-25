import './App.css'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
    </Routes>
  </Router> 
  )
}

export default App
