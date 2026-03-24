import { useState } from "react";

function Navbar() {
  const [portions, setPortions] = useState(1);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
      
      <h1 className="font-heading text-xl font-bold text-green-600">
        RECIPY
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Portions</span>

        <button
          onClick={() => setPortions((p) => (p > 1 ? p - 1 : 1))}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          −
        </button>

        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
          {portions}
        </span>

        <button
          onClick={() => setPortions((p) => p + 1)}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Navbar;