import { Button, InputGroup, InputGroupInput, InputGroupTextArea } from '@heroui/react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRef } from 'react'

const emptyProfile = {
  name: '',
  email: '',
  phone: '',
  github: '',
  linkedin: '',
  portfolio: '',
  bio: '',
  cv: null,
}

export default function ProfileTab() {
  const [profile, setProfile] = useLocalStorage('job-tracker-profile', emptyProfile)
  const cvInputRef = useRef(null)
  const [saved, setSaved] = useLocalStorage('_profile_saved', false)

  const updateField = (field) => (e) => {
    setProfile((p) => ({ ...p, [field]: e.target.value }))
    setSaved(false)
  }

  const handleCVUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setProfile((p) => ({ ...p, cv: { name: file.name, data: reader.result } }))
      setSaved(false)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const removeCv = () => {
    setProfile((p) => ({ ...p, cv: null }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">My Profile</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-default-700 mb-1 block">Full Name</label>
            <InputGroup fullWidth>
              <InputGroupInput
                value={profile.name}
                onChange={updateField('name')}
                placeholder="Your full name"
                aria-label="Full Name"
              />
            </InputGroup>
          </div>
          <div>
            <label className="text-sm font-medium text-default-700 mb-1 block">Email</label>
            <InputGroup fullWidth>
              <InputGroupInput
                type="email"
                value={profile.email}
                onChange={updateField('email')}
                placeholder="your@email.com"
                aria-label="Email"
              />
            </InputGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-default-700 mb-1 block">Phone</label>
            <InputGroup fullWidth>
              <InputGroupInput
                type="tel"
                value={profile.phone}
                onChange={updateField('phone')}
                placeholder="+351 912 345 678"
                aria-label="Phone"
              />
            </InputGroup>
          </div>
          <div>
            <label className="text-sm font-medium text-default-700 mb-1 block">Portfolio / Website</label>
            <InputGroup fullWidth>
              <InputGroupInput
                type="url"
                value={profile.portfolio}
                onChange={updateField('portfolio')}
                placeholder="https://yoursite.com"
                aria-label="Portfolio"
              />
            </InputGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-default-700 mb-1 block">GitHub</label>
            <InputGroup fullWidth>
              <InputGroupInput
                type="url"
                value={profile.github}
                onChange={updateField('github')}
                placeholder="https://github.com/username"
                aria-label="GitHub"
              />
            </InputGroup>
          </div>
          <div>
            <label className="text-sm font-medium text-default-700 mb-1 block">LinkedIn</label>
            <InputGroup fullWidth>
              <InputGroupInput
                type="url"
                value={profile.linkedin}
                onChange={updateField('linkedin')}
                placeholder="https://linkedin.com/in/username"
                aria-label="LinkedIn"
              />
            </InputGroup>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-default-700 mb-1 block">Bio / Summary</label>
          <InputGroup fullWidth>
            <InputGroupTextArea
              value={profile.bio}
              onChange={updateField('bio')}
              placeholder="A short professional summary..."
              rows={3}
              aria-label="Bio"
            />
          </InputGroup>
        </div>

        <div>
          <label className="text-sm font-medium text-default-700 mb-1 block">CV / Resume</label>
          <input
            ref={cvInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleCVUpload}
            className="hidden"
          />
          {profile.cv ? (
            <div className="flex items-center gap-3">
              <a
                href={profile.cv.data}
                download={profile.cv.name}
                className="text-sm text-primary hover:underline"
              >
                {profile.cv.name}
              </a>
              <button
                type="button"
                onClick={removeCv}
                className="text-sm text-danger hover:underline"
              >
                Remove
              </button>
              <Button
                className="border border-default-300 rounded-md"
                size="sm"
                onPress={() => cvInputRef.current?.click()}
              >
                Replace
              </Button>
            </div>
          ) : (
            <Button
              className="border border-default-300 rounded-md"
              size="sm"
              onPress={() => cvInputRef.current?.click()}
            >
              + Upload CV
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            className="bg-primary text-white border border-primary rounded-md"
            onPress={handleSave}
          >
            Save Profile
          </Button>
          {saved && <span className="text-sm text-success">Saved!</span>}
        </div>
      </div>
    </div>
  )
}
