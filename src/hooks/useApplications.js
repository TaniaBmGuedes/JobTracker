import { useState, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const emptyForm = {
  company: '',
  role: '',
  status: 'applied',
  date: new Date().toISOString().split('T')[0],
  contact: '',
  notes: '',
  salary: '',
  url: '',
  screenshots: [],
  attachments: [],
  history: [],
}

const today = () => new Date().toISOString().split('T')[0]

export function useApplications() {
  const [applications, setApplications] = useLocalStorage('job-applications', [])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [showArchived, setShowArchived] = useState(false)

  const handleSubmit = () => {
    if (!form.company.trim() || !form.role.trim()) return

    if (editingId) {
      setApplications((apps) =>
        apps.map((app) => (app.id === editingId ? { ...form, id: editingId } : app))
      )
      setEditingId(null)
    } else {
      const newApp = {
        ...form,
        id: Date.now(),
        history: [{ date: form.date, event: 'Applied', id: Date.now() }],
      }
      setApplications((apps) => [newApp, ...apps])
    }
    setForm(emptyForm)
    setShowForm(false)
  }

  const addHistoryEvent = (appId, event, date) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === appId
          ? { ...app, history: [...(app.history || []), { date: date || today(), event, id: Date.now() }] }
          : app
      )
    )
  }

  const removeHistoryEvent = (appId, eventId) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === appId
          ? { ...app, history: (app.history || []).filter((h) => h.id !== eventId) }
          : app
      )
    )
  }

  const handleArchive = (id) => {
    setApplications((apps) =>
      apps.map((app) => (app.id === id ? { ...app, archived: !app.archived } : app))
    )
  }

  const handleEdit = (app) => {
    setForm({ ...app })
    setEditingId(app.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    setApplications((apps) => apps.filter((app) => app.id !== id))
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const filtered = useMemo(() => {
    let result = applications.filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.role.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = filterStatus === 'all' || app.status === filterStatus
      const matchesArchive = showArchived || !app.archived
      return matchesSearch && matchesStatus && matchesArchive
    })

    const statusOrder = ['offer', 'interview', 'applied', 'no_response', 'rejected']

    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => b.date.localeCompare(a.date))
        break
      case 'date-asc':
        result.sort((a, b) => a.date.localeCompare(b.date))
        break
      case 'company':
        result.sort((a, b) => a.company.localeCompare(b.company))
        break
      case 'status':
        result.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
        break
    }

    return result
  }, [applications, search, filterStatus, sortBy, showArchived])

  const activeApps = applications.filter((a) => !a.archived)
  const archivedCount = applications.filter((a) => a.archived).length
  const countByStatus = (status) => activeApps.filter((a) => a.status === status).length

  const exportCSV = () => {
    const headers = ['Company', 'Role', 'Status', 'Date Applied', 'Contact', 'Salary', 'URL', 'Notes']
    const rows = applications.map((app) => [
      app.company,
      app.role,
      app.status,
      app.date,
      app.contact || '',
      app.salary || '',
      app.url || '',
      (app.notes || '').replace(/"/g, '""'),
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Job Applications', 14, 20)
    doc.setFontSize(10)
    doc.text(`Exported: ${new Date().toLocaleDateString()}`, 14, 28)

    const headers = ['Company', 'Role', 'Status', 'Date', 'Contact', 'Salary']
    const rows = applications.map((app) => [
      app.company,
      app.role,
      app.status,
      app.date,
      app.contact || '-',
      app.salary || '-',
    ])

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 34,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [99, 102, 241] },
    })

    doc.save(`job-applications-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const importCSV = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      const lines = text.split('\n').filter((l) => l.trim())
      if (lines.length < 2) return

      const parseCSVLine = (line) => {
        const result = []
        let current = ''
        let inQuotes = false
        for (let i = 0; i < line.length; i++) {
          const ch = line[i]
          if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"'
              i++
            } else {
              inQuotes = !inQuotes
            }
          } else if (ch === ',' && !inQuotes) {
            result.push(current.trim())
            current = ''
          } else {
            current += ch
          }
        }
        result.push(current.trim())
        return result
      }

      const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, ''))
      const imported = []

      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i])
        if (values.length < 2) continue

        const get = (name) => {
          const idx = headers.indexOf(name)
          return idx >= 0 ? values[idx] || '' : ''
        }

        const validStatuses = ['applied', 'interview', 'offer', 'rejected', 'no_response']
        const status = get('status').toLowerCase().replace(/\s+/g, '_')

        imported.push({
          id: Date.now() + i,
          company: get('company') || 'Unknown',
          role: get('role') || 'Unknown',
          status: validStatuses.includes(status) ? status : 'applied',
          date: get('dateapplied') || get('date') || today(),
          contact: get('contact') || get('contactperson') || '',
          salary: get('salary') || get('salaryrange') || '',
          url: get('url') || get('joburl') || '',
          notes: get('notes') || get('notes/feedback') || '',
          screenshots: [],
          history: [{ date: get('dateapplied') || get('date') || today(), event: 'Applied (imported)', id: Date.now() + i }],
        })
      }

      if (imported.length > 0) {
        setApplications((apps) => [...imported, ...apps])
      }
    }
    reader.readAsText(file)
  }

  return {
    applications,
    form,
    setForm,
    editingId,
    showForm,
    setShowForm,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    filtered,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel,
    countByStatus,
    activeApps,
    archivedCount,
    exportCSV,
    exportPDF,
    importCSV,
    addHistoryEvent,
    removeHistoryEvent,
    handleArchive,
    showArchived,
    setShowArchived,
  }
}
