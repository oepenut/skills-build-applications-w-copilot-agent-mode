import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="section-heading"><div><p className="eyebrow">Weekly standings</p><h2>Leaderboard</h2><p>Celebrate consistency, one point at a time.</p></div></div><div className="ranking-list">{error ? <p className="error-message">{error}</p> : entries.map((entry, index) => <article className="rank-row" key={entry._id || entry.id}><strong>0{index + 1}</strong><div><b>{entry.displayName || entry.userId}</b><span>{entry.teamId || 'Independent'}</span></div><b className="points">{entry.points || 0} pts</b></article>)}</div></section>
}

export default Leaderboard