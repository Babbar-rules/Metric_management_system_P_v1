import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMetrics } from '../context/MetricContext'
import DatasetUpload from '../components/DatasetUpload'
import Modal from '../components/Modal'
import './CreateMetric.css'

const CreateMetric = () => {
    const navigate = useNavigate()
    const { createMetric } = useMetrics()

    const [selectedColumns, setSelectedColumns] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        // Metric Identity (UUID removed - will be auto-generated)
        metricName: '',
        domain: '',
        category: 'Revenue',
        type: 'Count',
        status: 'Draft',
        version: '1.0',
        businessOwner: '',
        technicalSteward: '',

        // Business Definition
        description: '',
        businessPurpose: '',
        useCases: '',
        exclusionScenarios: '',
        unitOfMeasure: '',
        interpretationRules: '',

        // Abstract Business Formula
        abstractInputs: '',
        aggregationLogic: '',
        windowLogic: '',
        filterRules: ''
    })

    const generateUUID = (metricName, domain) => {
        const prefix = metricName.split(' ').map(w => w[0]).join('').toUpperCase()
        const domainPrefix = domain.substring(0, 3).toUpperCase()
        const timestamp = Date.now().toString().slice(-6)
        return `${prefix}-${domainPrefix}-${timestamp}`
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate required fields
        if (!formData.metricName || !formData.domain || !formData.businessOwner) {
            alert('Please fill in all required fields')
            return
        }

        // Auto-generate UUID
        const uuid = generateUUID(formData.metricName, formData.domain)

        // Create metric with selected columns and generated UUID
        const metricData = {
            ...formData,
            uuid,
            selectedColumns
        }

        createMetric(metricData)
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
        navigate('/user')
    }

    return (
        <div className="create-metric-page">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Create New Metric</h1>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate('/user')}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="create-metric-container">
                <div className="main-content">
                    <DatasetUpload
                        onColumnsSelected={setSelectedColumns}
                        selectedColumns={selectedColumns}
                    />
                </div>

                <div className="sidebar">
                    <form onSubmit={handleSubmit} className="metric-form">
                        <div className="form-section">
                            <h3>A. Metric Identity</h3>

                            <div className="form-group">
                                <label className="form-label">Metric Name *</label>
                                <input
                                    type="text"
                                    name="metricName"
                                    className="form-input"
                                    value={formData.metricName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Domain/Department *</label>
                                <input
                                    type="text"
                                    name="domain"
                                    className="form-input"
                                    value={formData.domain}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select
                                        name="category"
                                        className="form-select"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Revenue">Revenue</option>
                                        <option value="Engagement">Engagement</option>
                                        <option value="Risk">Risk</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Type</label>
                                    <select
                                        name="type"
                                        className="form-select"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Count">Count</option>
                                        <option value="Sum">Sum</option>
                                        <option value="Ratio">Ratio</option>
                                        <option value="Derived">Derived</option>
                                        <option value="Windowed">Windowed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select
                                        name="status"
                                        className="form-select"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="In Review">In Review</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Version</label>
                                    <input
                                        type="text"
                                        name="version"
                                        className="form-input"
                                        value={formData.version}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Business Owner *</label>
                                <input
                                    type="text"
                                    name="businessOwner"
                                    className="form-input"
                                    value={formData.businessOwner}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Technical Steward</label>
                                <input
                                    type="text"
                                    name="technicalSteward"
                                    className="form-input"
                                    value={formData.technicalSteward}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>B. Business Definition</h3>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Plain-English explanation of the metric"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Business Purpose</label>
                                <textarea
                                    name="businessPurpose"
                                    className="form-textarea"
                                    value={formData.businessPurpose}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Use Cases</label>
                                <textarea
                                    name="useCases"
                                    className="form-textarea"
                                    value={formData.useCases}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Exclusion Scenarios</label>
                                <textarea
                                    name="exclusionScenarios"
                                    className="form-textarea"
                                    value={formData.exclusionScenarios}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Unit of Measure</label>
                                <input
                                    type="text"
                                    name="unitOfMeasure"
                                    className="form-input"
                                    value={formData.unitOfMeasure}
                                    onChange={handleInputChange}
                                    placeholder="e.g., USD, count, percent"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Interpretation Rules</label>
                                <textarea
                                    name="interpretationRules"
                                    className="form-textarea"
                                    value={formData.interpretationRules}
                                    onChange={handleInputChange}
                                    placeholder="Rules for rounding, negative values, time cutoffs"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>C. Abstract Business Formula</h3>

                            <div className="form-group">
                                <label className="form-label">Abstract Inputs</label>
                                <input
                                    type="text"
                                    name="abstractInputs"
                                    className="form-input"
                                    value={formData.abstractInputs}
                                    onChange={handleInputChange}
                                    placeholder="e.g., transaction_amount, refund_amount"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Aggregation Logic</label>
                                <textarea
                                    name="aggregationLogic"
                                    className="form-textarea"
                                    value={formData.aggregationLogic}
                                    onChange={handleInputChange}
                                    placeholder="e.g., SUM(amount), AVG(value), COUNT(*)"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Window Logic</label>
                                <input
                                    type="text"
                                    name="windowLogic"
                                    className="form-input"
                                    value={formData.windowLogic}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Monthly rolling window"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Filter Rules</label>
                                <textarea
                                    name="filterRules"
                                    className="form-textarea"
                                    value={formData.filterRules}
                                    onChange={handleInputChange}
                                    placeholder="Business-level exclusion and filter rules"
                                />
                            </div>
                        </div>

                        {selectedColumns.length > 0 && (
                            <div className="selected-columns-info">
                                <h4>Selected Metric Columns:</h4>
                                <div className="columns-list">
                                    {selectedColumns.map(col => (
                                        <span key={col} className="badge badge-primary">{col}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-lg submit-btn">
                            Create Metric
                        </button>
                    </form>
                </div>
            </div>

            <Modal isOpen={showModal} onClose={handleModalClose} title="Success">
                <div className="success-modal">
                    <div className="success-icon">✅</div>
                    <h3>Metric Contract Created!</h3>
                    <p>Your new metric contract has been sent to the admin for review.</p>
                    <button className="btn btn-primary" onClick={handleModalClose}>
                        Back to Dashboard
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default CreateMetric
