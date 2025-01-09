import { AsyncPaginate } from "react-select-async-paginate";
import { useState, useEffect } from "react";
import { Api_Url } from "./api";
import './App.css';

export const Search = ({ onSearch }) => {
    // Set the default selected city to Bangalore
    const [search, setSearch] = useState({ value: 'Bangalore', label: 'Bangalore' });

    const handleInputChange = (searchVal) => {
        setSearch(searchVal);
        onSearch(searchVal);
    };

    const loadOptions = async (inputVal) => { 
        if (!inputVal) {
            return {
                options: [{ value: 'Bangalore', label: 'Bangalore' }]
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
            return { options: [] }; // Return an empty array in case of an error
        }
    };

    // Effect to call onSearch with the default value when the component mounts
    useEffect(() => {
        onSearch(search);
    },[search]);

    return (
        <>
            <AsyncPaginate
                cacheOptions
                placeholder="Search city.."
                onChange={handleInputChange}
                value={search}
                debounceTimeout={300}
                loadOptions={loadOptions}
                className="bg-black text-black text-start p-2 border border-amber-50 rounded-xl outline-none font-bold" 
            />
        </>
    );
};