export const STATUSES = [
  { value: 'applied', label: 'Applied', color: 'primary' },
  { value: 'interview', label: 'Interview', color: 'warning' },
  { value: 'offer', label: 'Offer', color: 'success' },
  { value: 'rejected', label: 'Rejected', color: 'danger' },
  { value: 'no_response', label: 'No Response', color: 'default' },
]

export const getStatusLabel = (value) =>
  STATUSES.find((s) => s.value === value)?.label ?? value

export const getStatusColor = (value) =>
  STATUSES.find((s) => s.value === value)?.color ?? 'default'
