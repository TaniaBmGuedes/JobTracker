const TABS = [
  { key: 'applications', label: 'Applications' },
  { key: 'profile', label: 'My Profile' },
]

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="border-b border-divider bg-content1 mb-6">
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.png" alt="Job Tracker" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-primary">Job Tracker</h1>
            <p className="text-sm text-default-500">Track your applications and progress</p>
          </div>
        </div>
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-background text-primary border-t border-x border-divider -mb-px'
                  : 'text-default-500 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}