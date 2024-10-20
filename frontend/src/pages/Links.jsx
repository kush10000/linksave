// import { useState } from "react"
// function Links() {
//     const [link, setLink] = useState("");
//     const [links, setLinks] = useState([]);
//     const [category, setCategory] = useState("");
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("Unsorted");
//     function addCategory() {
//         setCategories([...categories, category]);
//         setCategory('');
//     }
//     function addLink() {
//         setLinks([...links, { link: link, category: selectedCategory }]);
//         setLink('');
//     }
//     return <>
//         <div className="flex">
//             <div className="bg-gray-300 w-1/4 h-screen p-4">
//                 <h1>Categories</h1>
//                 <input placeholder="category" value={category} className="border-black border-2 p-2"
//                     onChange={(e) => {
//                         setCategory(e.target.value)
//                     }
//                     }
//                 >
//                 </input>
//                 <button className="" onClick={addCategory}>+</button>
//                 <ul className="mt-4">
//                     {categories.map((category, index) => (
//                         <li key={index} onClick={() => {
//                             setSelectedCategory(category)
//                             console.log(category)
//                         }}>
//                             {category}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="w-3/4 h-screen p-4">
//                 <input placeholder="link" value={link} className="border-black border-2 p-2 "
//                     onChange={(e) => {
//                         setLink(e.target.value)
//                     }}
//                 ></input>
//                 <button className="bg-black text-white p-2 m-2" onClick={addLink}>add link</button>
//                 <ul className="mt-4">
//                     {links
//                         .filter((link) => link.category === selectedCategory)
//                         .map((linkObj, index) => (
//                             <li key={index}>
//                                 {linkObj.link}
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </div>
//         </div>
//     </>
// }


// export default Links


import React, { useState, useEffect } from "react";
import { FaPlus, FaLink, FaTrash, FaFolder, FaSearch, FaSun, FaMoon, FaEllipsisH } from "react-icons/fa";

export default function Links() {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(["Unsorted"]);
  const [selectedCategory, setSelectedCategory] = useState("Unsorted");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(handleChange);

    return () => darkModeMediaQuery.removeListener(handleChange);
  }, []);

  function addCategory() {
    if (category.trim() !== "" && !categories.includes(category.trim())) {
      setCategories([...categories, category.trim()]);
      setCategory("");
    }
  }

  function addLink() {
    if (link.trim() !== "") {
      setLinks([...links, { url: link.trim(), description: description.trim(), category: selectedCategory }]);
      setLink("");
      setDescription("");
    }
  }

  function deleteLink(indexToDelete) {
    setLinks(links.filter((_, index) => index !== indexToDelete));
  }

  const filteredLinks = links.filter(
    (link) =>
      (selectedCategory === "Unsorted" ? link.category === "Unsorted" : link.category === selectedCategory) &&
      (link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`flex flex-col md:flex-row h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      <div className={`w-full md:w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Categories</h2>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'} hover:bg-opacity-80 transition duration-150 ease-in-out`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="New category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`flex-grow px-3 py-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          />
          <button
            onClick={addCategory}
            className={`px-3 py-2 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out`}
          >
            <FaPlus className="w-4 h-4" />
          </button>
        </div>
        <ul className="space-y-1">
          {categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out ${
                selectedCategory === cat
                  ? isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-700'
                  : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              <FaFolder className="inline-block mr-2" /> {cat}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Links</h2>
        <div className="space-y-3 mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="New link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={`flex-grow px-3 py-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
            />
            <button
              onClick={addLink}
              className={`px-4 py-2 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out`}
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none`}
            rows="2"
          />
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 text-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
            />
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>
        <ul className="space-y-3">
          {filteredLinks.map((link, index) => (
            <li key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-md shadow-sm hover:shadow-md transition duration-150 ease-in-out`}>
              <div className="flex justify-between items-start">
                <div className="flex-grow pr-4">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} flex items-center`}>
                    <FaLink className="mr-2 flex-shrink-0" /> 
                    <span className="text-sm font-medium break-all">{link.url}</span>
                  </a>
                  {link.description && (
                    <div className="mt-1 relative">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>{link.description}</p>
                      {link.description.length > 100 && (
                        <button className={`absolute bottom-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} pl-2`}>
                          <FaEllipsisH className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        </button>
                      )}
                    </div>
                  )}
                  <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-2 inline-block`}>{link.category}</span>
                </div>
                <button
                  onClick={() => deleteLink(links.indexOf(link))}
                  className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}