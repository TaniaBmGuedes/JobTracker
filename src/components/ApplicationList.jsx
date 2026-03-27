import ApplicationCard from './ApplicationCard'

export default function ApplicationList({ applications, onEdit, onDelete, onAddHistory, onRemoveHistory, onArchive }) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-16 text-default-400">
        <p className="text-lg mb-2">No applications found</p>
        <p>Click &quot;+ Add Application&quot; to start tracking your job search.</p>
      </div>
    )
  }

  return (
    <div>
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddHistory={onAddHistory}
          onRemoveHistory={onRemoveHistory}
          onArchive={onArchive}
        />
      ))}
    </div>
  )
}
