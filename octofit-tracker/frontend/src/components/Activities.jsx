import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return <CollectionPage title="Activity log" subtitle="Recent movement across your Octofit community." error={error}>
    {activities.map((activity) => <article className="data-row" key={activity._id || activity.id}>
      <div><strong>{activity.type || 'Workout'}</strong><span>{activity.userId || 'Unknown athlete'}</span></div>
      <b>{activity.durationMinutes || 0} min</b><span>{activity.points || 0} pts</span>
    </article>)}
  </CollectionPage>
}

function CollectionPage({ title, subtitle, error, children }) {
  return <section><div className="section-heading"><div><p className="eyebrow">Octofit data</p><h2>{title}</h2><p>{subtitle}</p></div><span className="record-count">{error ? 'Offline' : 'Live API'}</span></div><div className="data-list">{error ? <p className="error-message">{error}. Start the backend or check your API URL.</p> : children}</div></section>
}

export default Activities