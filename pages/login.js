javascript
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
export default function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const router = useRouter();
const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in...');

    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            toast.success('Logged in successfully!', { id: toastId });
            router.push('/dashboard');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        toast.error(error.message || 'Login failed.', { id: toastId });
    }
};

return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields here */}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                    <input className="w-full p-3 bg-gray-700 rounded text-white" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                    <input className="w-full p-3 bg-gray-700 rounded text-white" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg">Login</button>
            </form>
            <p className="text-center text-gray-400 mt-4">
                Don't have an account? <Link href="/register" className="text-indigo-400 hover:underline">Register</Link>
            </p>
        </div>
    </div>
);
  }
`/pages/dashboard.js` (Protected Page)
javascript
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // You can also verify the token with the backend on each load for extra security
        // For this example, we'll decode it on the client
        try {
            const decoded = jwt_decode(token);
            // Check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
              localStorage.removeItem('token');
              router.push('/login');
            } else {
              // A real app would fetch fresh user data from /api/users/me
              setUser({ id: decoded.id });
            }
        } catch (error) {
            localStorage.removeItem('token');
            router.push('/login');
        }
    }, [router]);

    if (!user) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
            
            <p className="text-lg">Welcome back, User ID: {user.id}.</p>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Your Websites</h2>
                {/* Website list and editor will go here */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <p>This is where the AI website builder interface will be.</p>
                    <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                      + Create New Website
                    </button>
                </div>
            </div>
        </div>
    );
}
