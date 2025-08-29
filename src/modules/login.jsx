import React, {useState, useEffect} from 'react';

export default function CurrentDate() {
  const [now, setNow] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
  <div className="flex flex-col min-h-screen text-3xl font-bold">
    {/* DATE AND TIME */}
    <header className="bg-blue-900 text-white p-8 flex items-center justify-between">
      <div className="text-left w-1/2">
        {formattedDate}
      </div>
      <div className="text-right w-1/2">
        {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
    </header>

    {/* Body with Login Form */}
    <main className="flex flex-1 items-center justify-center bg-gray-200 p-4">
      <form className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-base font-normal flex flex-col items-center">
        {/* Logo */}
        <img
          src="/images/Maclang.png"
          alt="Maclang Logo"
          className="w-24 h-24 mb-4"
        />
        {/* Hospital Name */}
        <h2 className="text-2xl font-bold mb-6 text-center">Rosario Maclang Bautista General Hospital</h2>
        <div className="mb-4 w-full">
          <label className="block mb-2" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>
                <div className="mb-6 w-full relative">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute right-4 top-2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-3xl hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </main>

    {/* Footer */}
    <footer className="bg-blue-900 text-white text-center p-4 flex items-center justify-center">
  <img
    src="/images/Maclang.png"
    alt="Maclang Logo"
    className="w-8 h-8 mr-2"
  />
  Rosario Maclang Bautista General Hospital
</footer>
    {/* <footer className="bg-blue-900 text-white text-center p-4">
      &copy; Rosario Maclang Bautista General Hospital
    </footer> */}
  </div>
);
}