import { Link } from 'react-router'

const otherApps = [
  {
    title: 'Size Chart',
    description: 'A simple size chart app',
    link: '/size-chart',
  },
  {
    title: 'PoGo Raids',
    description: 'Current raids in Pokémon Go',
    link: '/current-raids',
  },
]

export default function OtherAppsPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {otherApps.map(app => (
        <div key={app.title} className="p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-bold">{app.title}</h3>
          <p>{app.description}</p>
          <Link to={app.link} className="text-blue-500 hover:underline">
            Open
          </Link>
        </div>
      ))}
    </div>
  )
}
