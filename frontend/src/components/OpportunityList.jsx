import { useAuth } from '../context/AuthContext'
function formatDate(dateValue) {
  if (!dateValue) {
    return 'Not set'
  }

  return new Date(dateValue).toLocaleDateString()
}

function OpportunityList({ opportunities, onDelete, onEdit }) {
  const { user } = useAuth()
  if (opportunities.length === 0) {
    return (
      <section className="card empty-state">
        <h2>Opportunities</h2>
        <p>No opportunities found.</p>
      </section>
    )
  }

  return (
    <section className="opportunity-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Pipeline</p>
          <h2>Opportunities</h2>
        </div>
        <span className="count-pill">{opportunities.length}</span>
      </div>

      {opportunities.map((opportunity) => (
        <article className="card opportunity-card" key={opportunity._id}>
          <div className="opportunity-card-header">
            <div>
              <h3>{opportunity.customerName}</h3>
              <p>{opportunity.requirement}</p>
            </div>
            <span className={`priority-badge priority-${opportunity.priority.toLowerCase()}`}>
              {opportunity.priority}
            </span>
          </div>

          <div className="opportunity-meta">
            <span>Value: {opportunity.estimatedValue || 0}</span>
            <span>Stage: {opportunity.stage}</span>
            <span>Next follow-up: {formatDate(opportunity.nextFollowUpDate)}</span>
          </div>

          <div className="opportunity-details">
            {opportunity.contactName && <p>Contact: {opportunity.contactName}</p>}
            {opportunity.contactEmail && <p>Email: {opportunity.contactEmail}</p>}
            {opportunity.contactPhone && <p>Phone: {opportunity.contactPhone}</p>}
            {opportunity.notes && <p>Notes: {opportunity.notes}</p>}
            <p>
              Created By:{' '}
              {opportunity.owner?.name || 'Unknown User'}
            </p>
            <p>
              Created On:{' '}
              {new Date(opportunity.createdAt).toLocaleDateString()}
            </p>
          </div>

          {opportunity.owner?._id === user?.id && (
          <div className="card-actions">
            <button className="button button-secondary" type="button" onClick={() => onEdit(opportunity)}>
              Edit
            </button>
            <button className="button button-danger" type="button" onClick={() => onDelete(opportunity._id)}>
              Delete
            </button>
          </div>
          )}
        </article>
      ))}
    </section>
  )
}

export default OpportunityList
