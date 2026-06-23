import { useEffect, useMemo, useState } from 'react'
import OpportunityForm from '../components/OpportunityForm'
import OpportunityList from '../components/OpportunityList'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const initialFormData = {
  customerName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  requirement: '',
  estimatedValue: '',
  stage: 'New',
  priority: 'Medium',
  nextFollowUpDate: '',
  notes: '',
}

function formatDateForInput(dateValue) {
  if (!dateValue) {
    return ''
  }

  return new Date(dateValue).toISOString().split('T')[0]
}

function Dashboard() {
  const { logout, user } = useAuth()
  const [opportunities, setOpportunities] = useState([])
  const [formData, setFormData] = useState(initialFormData)
  const [editingOpportunityId, setEditingOpportunityId] = useState(null)
  const [stageFilter, setStageFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchOpportunities = async () => {
    setError('')

    try {
      const response = await api.get('/opportunities')
      setOpportunities(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load opportunities')
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOpportunities()
  }, [])

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesStage = !stageFilter || opportunity.stage === stageFilter
      const matchesPriority =
        !priorityFilter || opportunity.priority === priorityFilter

      return matchesStage && matchesPriority
    })
  }, [opportunities, priorityFilter, stageFilter])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingOpportunityId(null)
  }

  const buildPayload = () => ({
    ...formData,
    estimatedValue: formData.estimatedValue
      ? Number(formData.estimatedValue)
      : 0,
    nextFollowUpDate: formData.nextFollowUpDate || undefined,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (editingOpportunityId) {
        await api.put(`/opportunities/${editingOpportunityId}`, buildPayload())
        setSuccess('Opportunity updated successfully')
      } else {
        await api.post('/opportunities', buildPayload())
        setSuccess('Opportunity created successfully')
      }

      resetForm()
      await fetchOpportunities()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save opportunity')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (opportunity) => {
    setEditingOpportunityId(opportunity._id)
    setFormData({
      customerName: opportunity.customerName || '',
      contactName: opportunity.contactName || '',
      contactEmail: opportunity.contactEmail || '',
      contactPhone: opportunity.contactPhone || '',
      requirement: opportunity.requirement || '',
      estimatedValue: opportunity.estimatedValue || '',
      stage: opportunity.stage || 'New',
      priority: opportunity.priority || 'Medium',
      nextFollowUpDate: formatDateForInput(opportunity.nextFollowUpDate),
      notes: opportunity.notes || '',
    })
  }

  const handleDelete = async (opportunityId) => {
    setError('')
    setSuccess('')

    try {
      await api.delete(`/opportunities/${opportunityId}`)
      setSuccess('Opportunity deleted successfully')
      await fetchOpportunities()

      if (editingOpportunityId === opportunityId) {
        resetForm()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete opportunity')
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">CRM Opportunity Tracker</p>
          <h1>Dashboard</h1>
          <p className="header-copy">Welcome, {user?.name || 'user'}.</p>
        </div>
        <button type="button" className="button button-secondary" onClick={logout}>
          Logout
        </button>
      </header>

      {error && <p className="alert alert-error">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}

      <div className="dashboard-grid">
        <OpportunityForm
          formData={formData}
          loading={loading}
          onCancel={editingOpportunityId ? resetForm : null}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={
            editingOpportunityId ? 'Update Opportunity' : 'Create Opportunity'
          }
        />

        <section className="dashboard-main">
          <section className="card filter-card">
            <div>
              <p className="eyebrow">Pipeline View</p>
              <h2>Filters</h2>
            </div>

            <div className="filter-grid">
              <div className="field">
                <label htmlFor="stageFilter">Stage</label>
                <select
                  id="stageFilter"
                  value={stageFilter}
                  onChange={(event) => setStageFilter(event.target.value)}
                >
                  <option value="">All stages</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="priorityFilter">Priority</label>
                <select
                  id="priorityFilter"
                  value={priorityFilter}
                  onChange={(event) => setPriorityFilter(event.target.value)}
                >
                  <option value="">All priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </section>

          <OpportunityList
            opportunities={filteredOpportunities}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
