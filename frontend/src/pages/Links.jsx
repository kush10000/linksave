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


import React, { useState } from "react";

export default function Links() {
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(["Unsorted"]);
  const [selectedCategory, setSelectedCategory] = useState("Unsorted");

  function addCategory() {
    if (category.trim() !== "") {
      setCategories([...categories, category]);
      setCategory("");
    }
  }

  function addLink() {
    if (link.trim() !== "" && selectedCategory) {
      setLinks([...links, { url: link, category: selectedCategory }]);
      setLink("");
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <div className="w-1/4 bg-gray-800 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Categories</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="New category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-grow px-4 py-2 bg-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCategory}
            className="px-6 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            +
          </button>
        </div>
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer p-3 rounded-lg transition duration-200 ease-in-out ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Links</h2>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="New link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="flex-grow px-4 py-2 bg-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addLink}
            className="px-6 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {links
            .filter((l) => !selectedCategory || l.category === selectedCategory)
            .map((link, index) => (
              <li key={index} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {link.url}
                </a>
                <span className="ml-2 text-sm text-gray-400">({link.category})</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

