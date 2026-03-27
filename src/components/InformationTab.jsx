export default function InformationTab() {
  const csvFields = [
    { field: 'Company', accepted: 'Company, Empresa' },
    { field: 'Role', accepted: 'Role, Função, Cargo, Vaga, Posição' },
    { field: 'Status', accepted: 'Status, Estado, Situação' },
    { field: 'Date Applied', accepted: 'Date Applied, Date, Data de envio de Cv, Data' },
    { field: 'Contact', accepted: 'Contact, Contact Person, Contacto, Contato' },
    { field: 'Salary', accepted: 'Salary, Salary Range, Salário' },
    { field: 'URL', accepted: 'URL, Job URL, Link' },
    { field: 'Notes', accepted: 'Notes, Notes/Feedback, Notas, Observações' },
    { field: 'Role Description', accepted: 'Role Description, Descrição, Descrição da Função' },
    { field: 'Interview', accepted: 'Entrevista, Interview (auto-sets status to Interview if filled)' },
  ]

  const statuses = [
    { value: 'applied', label: 'Applied', description: 'CV/application submitted' },
    { value: 'interview', label: 'Interview', description: 'Interview scheduled or completed' },
    { value: 'offer', label: 'Offer', description: 'Received a job offer' },
    { value: 'rejected', label: 'Rejected', description: 'Application was rejected' },
    { value: 'no_response', label: 'No Response', description: 'No reply from the company' },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold text-primary mb-2">How to Use Job Tracker</h2>
        <p className="text-sm text-default-500 mb-4">
          Job Tracker helps you manage and track your job applications. You can add applications manually or import them from a CSV file.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">CSV Import Guide</h3>
        <p className="text-sm text-default-500 mb-3">
          When importing a CSV file, the app recognizes the following column headers (English and Portuguese). Headers are case-insensitive and spaces are ignored.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-default-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-default-100">
                <th className="text-left px-4 py-2 font-semibold border-b border-default-200">Field</th>
                <th className="text-left px-4 py-2 font-semibold border-b border-default-200">Accepted Column Names</th>
              </tr>
            </thead>
            <tbody>
              {csvFields.map((row) => (
                <tr key={row.field} className="border-b border-default-100">
                  <td className="px-4 py-2 font-medium">{row.field}</td>
                  <td className="px-4 py-2 text-default-500">{row.accepted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Date Formats</h3>
        <p className="text-sm text-default-500">
          The app accepts dates in the following formats:
        </p>
        <ul className="list-disc list-inside text-sm text-default-500 mt-2 space-y-1">
          <li><span className="font-medium">d/m/yyyy</span> — e.g. 6/3/2026</li>
          <li><span className="font-medium">d/m/yy</span> — e.g. 10/03/26</li>
          <li><span className="font-medium">yyyy-mm-dd</span> — e.g. 2026-03-10</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Application Statuses</h3>
        <div className="space-y-2">
          {statuses.map((s) => (
            <div key={s.value} className="flex items-start gap-3 text-sm">
              <span className="font-medium min-w-28">{s.label}</span>
              <span className="text-default-500">{s.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Features</h3>
        <ul className="list-disc list-inside text-sm text-default-500 space-y-1">
          <li>Add, edit, and delete job applications</li>
          <li>Track application status with visual indicators</li>
          <li>Add timeline events to track progress</li>
          <li>Attach screenshots (proof of submission) and PDF documents</li>
          <li>Search, filter by status, and sort applications</li>
          <li>Archive old applications</li>
          <li>Export to CSV or PDF</li>
          <li>Import from CSV (English and Portuguese headers)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">CSV Example</h3>
        <div className="bg-default-100 rounded-lg p-4 overflow-x-auto">
          <pre className="text-xs text-default-600">
{`Company,Role,Status,Date Applied,Contact,Salary,URL,Notes
Google,Frontend Dev,applied,2026-03-10,Jane Doe,$80k-$100k,https://careers.google.com,Waiting for reply
Spotify,React Engineer,interview,2026-03-05,John Smith,,https://jobs.spotify.com,Technical interview on Friday`}
          </pre>
        </div>
        <p className="text-xs text-default-400 mt-2">Or in Portuguese:</p>
        <div className="bg-default-100 rounded-lg p-4 overflow-x-auto mt-1">
          <pre className="text-xs text-default-600">
{`Empresa,Cargo,Data de envio de Cv,Entrevista,Notas
Google,Frontend Dev,10/03/2026,,A aguardar resposta
Spotify,React Engineer,05/03/2026,10/03/26 16:30,Entrevista técnica`}
          </pre>
        </div>
      </section>
    </div>
  )
}
