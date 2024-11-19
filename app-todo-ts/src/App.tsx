import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { TodoApp } from './Pages/todo'
import './styles/global.css'


function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* Redirige de '/' a '/todo' */}
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
