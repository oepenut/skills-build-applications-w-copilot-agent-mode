import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const usersApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(usersApiUrl).then(setUsers).catch((loadError) => setError(loadError.message)) }, [])
  return <section><div className="section-heading"><div><p className="eyebrow">Your community</p><h2>Users</h2><p>Meet the athletes building a healthier rhythm.</p></div></div><div className="tile-grid">{error ? <p className="error-message">{error}</p> : users.map((user) => <article className="tile" key={user._id || user.id}><p className="tile-kicker">@{user.username}</p><h3>{user.displayName}</h3><p>{user.email}</p></article>)}</div></section>
}

export default Users