import { Card, CardContent, Chip, ChipLabel, Button, Link, InputGroup, InputGroupInput } from '@heroui/react'
import { getStatusLabel, getStatusColor } from '../constants/statuses'
import { useState } from 'react'

const colorClasses = {
  primary: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  default: 'bg-default/20 text-default-600',
}

export default function ApplicationCard({ app, onEdit, onDelete, onAddHistory, onRemoveHistory, onArchive }) {
  const chipClass = colorClasses[getStatusColor(app.status)] || colorClasses.default
  const [previewImg, setPreviewImg] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [newEvent, setNewEvent] = useState('')
  const [newEventDate, setNewEventDate] = useState(new Date().toISOString().split('T')[0])

  const history = [...(app.history || [])].sort((a, b) => a.date.localeCompare(b.date))

  const handleAddEvent = () => {
    if (!newEvent.trim()) return
    onAddHistory(app.id, newEvent.trim(), newEventDate)
    setNewEvent('')
    setNewEventDate(new Date().toISOString().split('T')[0])
  }

  return (
    <>
      <Card className={`mb-3 ${app.archived ? 'opacity-60' : ''}`}>
        <CardContent className="space-y-2 py-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-lg font-semibold">{app.company}</p>
                <p className="text-sm text-default-500">{app.role}</p>
              </div>
              {app.archived && (
                <span className="text-xs bg-default-100 text-default-500 px-2 py-0.5 rounded">Archived</span>
              )}
            </div>
            <Chip size="sm" className={chipClass}>
              <ChipLabel>{getStatusLabel(app.status)}</ChipLabel>
            </Chip>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-default-400">
            <span>Applied: {app.date}</span>
            {app.contact && <span>Contact: {app.contact}</span>}
            {app.salary && <span>Salary: {app.salary}</span>}
            {app.url && (
              <Link href={app.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">
                Job Post
              </Link>
            )}
          </div>

          {app.notes && (
            <p className="text-sm text-default-500 border-t border-divider pt-2 mt-1">
              {app.notes}
            </p>
          )}

          {app.screenshots?.length > 0 && (
            <div className="border-t border-divider pt-2 mt-1">
              <p className="text-xs text-default-400 mb-2">Proof of submission</p>
              <div className="flex flex-wrap gap-2">
                {app.screenshots.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Proof ${i + 1}`}
                    className="w-24 h-16 object-cover rounded-md border border-default-200 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setPreviewImg(src)}
                  />
                ))}
              </div>
            </div>
          )}

          {app.attachments?.length > 0 && (
            <div className="border-t border-divider pt-2 mt-1">
              <p className="text-xs text-default-400 mb-2">Attachments</p>
              <div className="flex flex-wrap gap-2">
                {app.attachments.map((att, i) => (
                  <a
                    key={i}
                    href={att.data}
                    download={att.name}
                    className="flex items-center gap-1 bg-default-100 rounded-md px-3 py-1.5 text-sm text-primary hover:underline"
                  >
                    {att.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Timeline / History */}
          <div className="border-t border-divider pt-2 mt-1">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-primary font-medium hover:underline"
            >
              {showHistory ? 'Hide' : 'Show'} Timeline ({history.length} event{history.length !== 1 ? 's' : ''})
            </button>

            {showHistory && (
              <div className="mt-3">
                {history.length > 0 && (
                  <div className="relative ml-3 border-l-2 border-primary/20 pl-4 space-y-3 mb-3">
                    {history.map((h) => (
                      <div key={h.id} className="relative group">
                        <div className="absolute -left-5.25 top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white dark:border-zinc-900" />
                        <p className="text-sm font-medium">{h.event}</p>
                        <p className="text-xs text-default-400">{h.date}</p>
                        <button
                          type="button"
                          onClick={() => onRemoveHistory(app.id, h.id)}
                          className="absolute top-0 right-0 text-danger text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                        >
                          remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 items-end flex-wrap">
                  <InputGroup className="flex-1 min-w-32">
                    <InputGroupInput
                      value={newEvent}
                      onChange={(e) => setNewEvent(e.target.value)}
                      placeholder="e.g. Interview scheduled"
                      aria-label="New event"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEvent())}
                    />
                  </InputGroup>
                  <InputGroup className="w-36">
                    <InputGroupInput
                      type="date"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      aria-label="Event date"
                    />
                  </InputGroup>
                  <Button
                    size="sm"
                    className="bg-primary text-white border border-primary rounded-md"
                    onPress={handleAddEvent}
                  >
                    + Add
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-1">
            <Button size="sm" className="text-default-500 border border-default-300 rounded-md" onPress={() => onArchive(app.id)}>
              {app.archived ? 'Unarchive' : 'Archive'}
            </Button>
            <Button size="sm" className="text-primary border border-primary/30 rounded-md" onPress={() => onEdit(app)}>
              Edit
            </Button>
            <Button size="sm" className="text-danger border border-danger/30 rounded-md" onPress={() => onDelete(app.id)}>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {previewImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setPreviewImg(null)}>
          <div className="absolute inset-0 bg-black/70" />
          <img
            src={previewImg}
            alt="Screenshot preview"
            className="relative max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  )
}
