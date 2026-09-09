import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(workoutsApiUrl).then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="section-heading"><div><p className="eyebrow">Suggested sessions</p><h2>Workouts</h2><p>Choose a focused session and make it count.</p></div></div><div className="tile-grid">{error ? <p className="error-message">{error}</p> : workouts.map((workout) => <article className="tile workout-tile" key={workout._id || workout.id}><div className="workout-meta"><span>{workout.level}</span><span>{workout.durationMinutes} min</span></div><h3>{workout.title}</h3><p>{workout.description}</p><small>{workout.activities?.join(' / ')}</small></article>)}</div></section>
}

export default Workouts