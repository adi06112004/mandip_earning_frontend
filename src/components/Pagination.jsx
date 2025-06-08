import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded transition ${
          page === 1
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:bg-gray-600'
        }`}
      >
        Prev
      </button>

      <span className="text-gray-300 font-medium px-4 py-2">
        Page <span className="text-white">{page}</span> of <span className="text-white">{totalPages}</span>
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded transition ${
          page === totalPages
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:bg-gray-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
