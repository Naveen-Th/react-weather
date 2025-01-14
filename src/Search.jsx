import { AsyncPaginate } from "react-select-async-paginate";
import { useState, useEffect } from "react";
import { Api_Url } from "./api";

export const Search = ({ onSearch }) => {
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
        <div>
            <AsyncPaginate
                cacheOptions
                placeholder="Search city.."
                onChange={handleInputChange}
                value={search}
                debounceTimeout={300}
                loadOptions={loadOptions}
                className="bg-black text-black text-start p-1 border border-amber-50 rounded-xl outline-none font-bold" 
            />
        </div>
    );
};