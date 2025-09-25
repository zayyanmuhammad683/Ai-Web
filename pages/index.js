import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">Zayyansencetech AI Website Builder</h1>
      <p className="text-xl mb-8">The future of web design is here. Break the internet.</p>
      <div>
        <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg mr-4">
          Get Started
        </Link>
        <Link href="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
