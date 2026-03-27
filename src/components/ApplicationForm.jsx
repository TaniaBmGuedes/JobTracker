import {
  Button,
  InputGroup,
  InputGroupInput,
  InputGroupTextArea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from '@heroui/react'
import { STATUSES } from '../constants/statuses'
import { useRef } from 'react'

export default function ApplicationForm({ isOpen, onClose, form, setForm, editingId, onSubmit }) {
  const fileInputRef = useRef(null)
  const pdfInputRef = useRef(null)
  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleScreenshots = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => {
        setForm((f) => ({
          ...f,
          screenshots: [...(f.screenshots || []), reader.result],
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeScreenshot = (index) => {
    setForm((f) => ({
      ...f,
      screenshots: f.screenshots.filter((_, i) => i !== index),
    }))
  }

  const handlePDFs = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      if (file.type !== 'application/pdf') return
      const reader = new FileReader()
      reader.onload = () => {
        setForm((f) => ({
          ...f,
          attachments: [...(f.attachments || []), { name: file.name, data: reader.result }],
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeAttachment = (index) => {
    setForm((f) => ({
      ...f,
      attachments: (f.attachments || []).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <h2 className="text-xl font-semibold">{editingId ? 'Edit Application' : 'New Application'}</h2>
            <button type="button" onClick={onClose} className="text-default-400 hover:text-foreground text-2xl leading-none">&times;</button>
          </div>

          <div className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-default-700 mb-1 block">Company *</label>
                <InputGroup fullWidth>
                  <InputGroupInput
                    value={form.company}
                    onChange={updateField('company')}
                    placeholder="e.g. Google"
                    required
                    aria-label="Company"
                  />
                </InputGroup>
              </div>
              <div>
                <label className="text-sm font-medium text-default-700 mb-1 block">Role *</label>
                <InputGroup fullWidth>
                  <InputGroupInput
                    value={form.role}
                    onChange={updateField('role')}
                    placeholder="e.g. Frontend Developer"
                    required
                    aria-label="Role"
                  />
                </InputGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-default-700 mb-1 block">Status</label>
                <Select
                  aria-label="Status"
                  selectedKey={form.status}
                  onSelectionChange={(key) => setForm((f) => ({ ...f, status: key }))}
                  className="w-full"
                >
                  <SelectTrigger>
                    <SelectValue />
                    <SelectIndicator />
                  </SelectTrigger>
                  <SelectPopover>
                    <ListBox>
                      {STATUSES.map((s) => (
                        <ListBoxItem key={s.value} id={s.value}>
                          {s.label}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </SelectPopover>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-default-700 mb-1 block">Date Applied</label>
                <InputGroup fullWidth>
                  <InputGroupInput
                    type="date"
                    value={form.date}
                    onChange={updateField('date')}
                    aria-label="Date Applied"
                  />
                </InputGroup>
              </div>
              <div>
                <label className="text-sm font-medium text-default-700 mb-1 block">Contact Person</label>
                <InputGroup fullWidth>
                  <InputGroupInput
                    value={form.contact}
                    onChange={updateField('contact')}
                    placeholder="Recruiter name"
                    aria-label="Contact Person"
                  />
                </InputGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-default-700 mb-1 block">Salary Range</label>
                <InputGroup fullWidth>
                  <InputGroupInput
                    value={form.salary || ''}
                    onChange={updateField('salary')}
                    placeholder="e.g. $80k - $100k"
                    aria-label="Salary Range"
                  />
                </InputGroup>
              </div>
              <div>
                <label className="text-sm font-medium text-default-700 mb-1 block">Job URL</label>
                <InputGroup fullWidth>
                  <InputGroupInput
                    type="url"
                    value={form.url || ''}
                    onChange={updateField('url')}
                    placeholder="https://..."
                    aria-label="Job URL"
                  />
                </InputGroup>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-default-700 mb-1 block">Notes / Feedback</label>
              <InputGroup fullWidth>
                <InputGroupTextArea
                  value={form.notes}
                  onChange={updateField('notes')}
                  placeholder="Interview feedback, next steps, salary info..."
                  rows={3}
                  aria-label="Notes"
                />
              </InputGroup>
            </div>

            <div>
              <label className="text-sm font-medium text-default-700 mb-1 block">Screenshots (proof of submission)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleScreenshots}
                className="hidden"
              />
              <Button
                className="border border-default-300 rounded-md"
                size="sm"
                onPress={() => fileInputRef.current?.click()}
              >
                + Add Screenshot
              </Button>

              {form.screenshots?.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {form.screenshots.map((src, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        className="w-28 h-20 object-cover rounded-md border border-default-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(i)}
                        className="absolute -top-2 -right-2 bg-danger text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-default-700 mb-1 block">PDF Attachments</label>
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf"
                multiple
                onChange={handlePDFs}
                className="hidden"
              />
              <Button
                className="border border-default-300 rounded-md"
                size="sm"
                onPress={() => pdfInputRef.current?.click()}
              >
                + Add PDF
              </Button>

              {form.attachments?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.attachments.map((att, i) => (
                    <div key={i} className="relative group flex items-center gap-1 bg-default-100 rounded-md px-3 py-1.5 text-sm">
                      <span>{att.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(i)}
                        className="text-danger ml-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 px-6 pb-6 pt-2">
            <Button className="border border-default-300 rounded-md" onPress={onClose}>
              Cancel
            </Button>
            <Button className="bg-primary text-white border border-primary rounded-md" type="submit">
              {editingId ? 'Save Changes' : 'Add Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
