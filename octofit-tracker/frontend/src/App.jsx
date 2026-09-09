import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark">O</div>
        <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1>Move with momentum.</h1>
        </div>
      </header>
      <nav className="app-nav" aria-label="Primary navigation">
        {[
          ['/', 'Overview'],
          ['/activities', 'Activities'],
          ['/leaderboard', 'Leaderboard'],
          ['/teams', 'Teams'],
          ['/users', 'Users'],
          ['/workouts', 'Workouts'],
        ].map(([path, label]) => (
          <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>
        ))}
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="intro-panel">
      <p className="eyebrow">Your training desk</p>
      <h2>Small sessions. Stronger weeks.</h2>
      <p>Track the people, teams, workouts, and activity that keep your community moving.</p>
      <div className="overview-links">
        <NavLink className="primary-action" to="/workouts">Find a workout</NavLink>
        <NavLink className="text-action" to="/leaderboard">View the leaderboard</NavLink>
      </div>
    </section>
  )
}

export default App
