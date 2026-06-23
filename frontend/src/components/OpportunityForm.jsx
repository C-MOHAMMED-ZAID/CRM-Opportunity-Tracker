function OpportunityForm({
  formData,
  loading,
  onCancel,
  onChange,
  onSubmit,
  submitLabel,
}) {
  return (
    <form className="card opportunity-form" onSubmit={onSubmit}>
      <div>
        <p className="eyebrow">Opportunity</p>
        <h2>{submitLabel}</h2>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            value={formData.customerName}
            onChange={onChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="contactName">Contact Name</label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            value={formData.contactName}
            onChange={onChange}
          />
        </div>

        <div className="field">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={onChange}
          />
        </div>

        <div className="field">
          <label htmlFor="contactPhone">Contact Phone</label>
          <input
            id="contactPhone"
            name="contactPhone"
            type="text"
            value={formData.contactPhone}
            onChange={onChange}
          />
        </div>

        <div className="field span-2">
          <label htmlFor="requirement">Requirement</label>
          <textarea
            id="requirement"
            name="requirement"
            value={formData.requirement}
            onChange={onChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="estimatedValue">Estimated Value</label>
          <input
            id="estimatedValue"
            name="estimatedValue"
            type="number"
            min="0"
            value={formData.estimatedValue}
            onChange={onChange}
          />
        </div>

        <div className="field">
          <label htmlFor="stage">Stage</label>
          <select
            id="stage"
            name="stage"
            value={formData.stage}
            onChange={onChange}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={onChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="nextFollowUpDate">Next Follow-Up Date</label>
          <input
            id="nextFollowUpDate"
            name="nextFollowUpDate"
            type="date"
            value={formData.nextFollowUpDate}
            onChange={onChange}
          />
        </div>

        <div className="field span-2">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </button>

        {onCancel && (
          <button className="button button-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default OpportunityForm
