import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="home-page">
            <div className="home-container">
                <div className="home-header fade-in">
                    <h1 className="home-title">
                        <span className="gradient-text">Metric Management</span>
                        <span className="gradient-text">System</span>
                    </h1>
                    <p className="home-subtitle">
                        Create, manage, and approve metric contracts with ease
                    </p>
                </div>

                <div className="login-options">
                    <div className="login-card fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="login-icon">👤</div>
                        <h2>User Login</h2>
                        <p>Create and manage metric contracts</p>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/user')}
                        >
                            Login as User
                        </button>
                    </div>

                    <div className="login-card fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="login-icon">⚙️</div>
                        <h2>Admin Login</h2>
                        <p>Review and approve metric contracts</p>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/admin')}
                        >
                            Login as Admin
                        </button>
                    </div>
                </div>

                <div className="home-footer fade-in" style={{ animationDelay: '0.3s' }}>
                    <p className="text-muted">
                        Streamline your metric governance with our comprehensive management platform
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home
