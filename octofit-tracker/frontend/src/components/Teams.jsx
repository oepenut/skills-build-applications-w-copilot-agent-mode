import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="section-heading"><div><p className="eyebrow">Find your people</p><h2>Teams</h2><p>Groups that make showing up easier.</p></div></div><div className="tile-grid">{error ? <p className="error-message">{error}</p> : teams.map((team) => <article className="tile" key={team._id || team.id}><p className="tile-kicker">{team.memberIds?.length || 0} members</p><h3>{team.name}</h3><p>{team.description || 'No description yet.'}</p></article>)}</div></section>
}

export default Teams