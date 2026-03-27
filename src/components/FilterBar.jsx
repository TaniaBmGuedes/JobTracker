import { Button, InputGroup, InputGroupInput, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem, Switch, SwitchControl, SwitchThumb } from '@heroui/react'
import { STATUSES } from '../constants/statuses'
import { useRef } from 'react'

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'company', label: 'Company A-Z' },
  { value: 'status', label: 'Status' },
]

export default function FilterBar({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  onExportCSV,
  onExportPDF,
  onImportCSV,
  onAdd,
  showArchived,
  setShowArchived,
  archivedCount,
  onClearFilters,
  hasActiveFilters,
}) {
  const csvInputRef = useRef(null)

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onImportCSV(file)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-wrap gap-3 items-end">
        <InputGroup className="flex-1 min-w-50">
          <InputGroupInput
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search applications"
          />
        </InputGroup>

        <Select
          aria-label="Filter by status"
          selectedKey={filterStatus}
          onSelectionChange={setFilterStatus}
          className="w-44"
        >
          <SelectTrigger>
            <SelectValue />
            <SelectIndicator />
          </SelectTrigger>
          <SelectPopover>
            <ListBox>
              <ListBoxItem id="all">All Statuses</ListBoxItem>
              {STATUSES.map((s) => (
                <ListBoxItem key={s.value} id={s.value}>
                  {s.label}
                </ListBoxItem>
              ))}
            </ListBox>
          </SelectPopover>
        </Select>

        <Select
          aria-label="Sort by"
          selectedKey={sortBy}
          onSelectionChange={setSortBy}
          className="w-44"
        >
          <SelectTrigger>
            <SelectValue />
            <SelectIndicator />
          </SelectTrigger>
          <SelectPopover>
            <ListBox>
              {SORT_OPTIONS.map((s) => (
                <ListBoxItem key={s.value} id={s.value}>
                  {s.label}
                </ListBoxItem>
              ))}
            </ListBox>
          </SelectPopover>
        </Select>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Button className="bg-primary text-white border border-primary rounded-md" onPress={onAdd}>
          + Add Application
        </Button>
        <Button className="border border-default-300 rounded-md" onPress={onExportCSV}>
          Export CSV
        </Button>
        <Button className="border border-default-300 rounded-md" onPress={onExportPDF}>
          Export PDF
        </Button>
        <input
          ref={csvInputRef}
          type="file"
          accept=".csv"
          onChange={handleImport}
          className="hidden"
        />
        <Button className="border border-default-300 rounded-md" onPress={() => csvInputRef.current?.click()}>
          Import CSV
        </Button>

        <div className="ml-auto flex flex-wrap gap-4 items-center">
          <Switch isSelected={showArchived} onChange={setShowArchived} size="sm">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
            <span className="text-sm">Show Archived ({archivedCount})</span>
          </Switch>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-sm text-danger hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
