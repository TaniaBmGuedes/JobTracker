import { useState } from 'react'
import Header from './components/Header'
import StatsBoard from './components/StatsBoard'
import FilterBar from './components/FilterBar'
import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'
import ProfileTab from './components/ProfileTab'
import { useApplications } from './hooks/useApplications'

function App() {
  const [activeTab, setActiveTab] = useState('applications')
  const {
    activeApps,
    archivedCount,
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
    exportCSV,
    exportPDF,
    importCSV,
    addHistoryEvent,
    removeHistoryEvent,
    handleArchive,
    showArchived,
    setShowArchived,
  } = useApplications()

  const clearFilters = () => {
    setSearch('')
    setFilterStatus('all')
    setSortBy('date-desc')
    setShowArchived(false)
  }

  const hasActiveFilters = search || filterStatus !== 'all' || sortBy !== 'date-desc' || showArchived

  return (
    <div className="text-foreground bg-background min-h-dvh">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-4xl mx-auto px-4 pb-12">
        {activeTab === 'applications' && (
          <>
            <StatsBoard total={activeApps.length} countByStatus={countByStatus} />

            <FilterBar
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onExportCSV={exportCSV}
              onExportPDF={exportPDF}
              onImportCSV={importCSV}
              onAdd={() => setShowForm(true)}
              showArchived={showArchived}
              setShowArchived={setShowArchived}
              archivedCount={archivedCount}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <ApplicationForm
              isOpen={showForm}
              onClose={handleCancel}
              form={form}
              setForm={setForm}
              editingId={editingId}
              onSubmit={handleSubmit}
            />

            <ApplicationList
              applications={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddHistory={addHistoryEvent}
              onRemoveHistory={removeHistoryEvent}
              onArchive={handleArchive}
            />
          </>
        )}

        {activeTab === 'profile' && <ProfileTab />}
      </main>
    </div>
  )
}

export default App