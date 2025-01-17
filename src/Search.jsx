import { AsyncPaginate } from "react-select-async-paginate";
import { useState, useEffect } from "react";
import { Api_Url } from "./api";

export const Search = ({ onSearch,setUser,user }) => {
    // Set the default selected city to Bangalore
    const [search, setSearch] = useState('');

    const handleInputChange = (searchVal) => {
        setSearch(searchVal);
        onSearch(searchVal);
    };

    const loadOptions = async (inputVal) => { 
        if (!inputVal) {
            return {
                options: []
            };
        }
        try {
            const res = await fetch(`${Api_Url}&q=${inputVal}`);
            const data = await res.json();
            return {
                options: data.map((city) => ({
                    value: `${city.name},${city.region}`,
                    label: `${city.name} ${city.region} ${city.country}`
                }))
            };
        } catch (err) { 
            console.error(err.message);
            return { options: [] }; 
        }
    };

    // Effect to call onSearch with the default value when the component mounts
    useEffect(() => {
        onSearch(search);
    },[search]);

    return (
        <div className="flex items-center justify-between gap-2 sticky w-full  top-0 p-0 bg-white rounded-xl">
            <AsyncPaginate
                cacheOptions
                placeholder="Search city.."
                onChange={handleInputChange}
                value={search}
                debounceTimeout={300}
                loadOptions={loadOptions}
                className="bg-white text-black text-start p-1 border-0 w-11/12 shadow-lg rounded-lg font-bold" 
            />
            <button onClick={() => setUser(null)}><i className="fa-solid fa-arrow-right-from-bracket text-xl rounded-lg shadow-lg bg-white p-2"></i></button>
        </div>
    );
}; 