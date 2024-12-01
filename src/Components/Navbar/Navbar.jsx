import React from 'react'

const Navbar = () => {
  const handleSearch = (event) => {
    const query = event.target.value;
    console.log("Searching for:", query);
    // Implement search logic here (e.g., make an API call)
  };

  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex items-center'>
      <div className='justify-between'>
          <div>
            <label className="input input-bordered flex items-center gap-2">
          <input 
          type="text"
          
          
           />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
            </label>
          </div>
          <div>
            

          </div>
      </div>
    </div>
  )
}

export default Navbar
