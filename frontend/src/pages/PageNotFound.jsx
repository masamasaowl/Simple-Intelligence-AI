// PageNotFound.jsx
function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      {/* Place your icon / image here */}
      <div className="h-24 w-24 mb-6 rounded-lg bg-gray-100 flex items-center justify-center">
        {/* Example placeholder: remove this div once you add your image */}
        <span className="text-gray-400 text-sm">Icon / Image</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mb-3">
        Page Not Found
      </h1>

      <p className="text-gray-600 text-center max-w-sm mb-8">
        The page you're looking for might have been moved, deleted, or never existed.
      </p>

      <a
        href="/"
        className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default PageNotFound;
