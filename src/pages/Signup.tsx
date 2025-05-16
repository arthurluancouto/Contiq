import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-rich-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-neon-red rounded-md p-1">
              <Zap size={24} className="text-rich-black" />
            </div>
            <span className="text-xl font-bold">Contiq</span>
          </Link>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-6 text-white/60">
            Already have an account?{' '}
            <Link to="/login" className="text-neon-red hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}