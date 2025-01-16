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
        <div className=" p-0 md:p-2 flex w-full justify-between bg-white/0 md:top-2 rounded-full ">
            <AsyncPaginate
                cacheOptions
                placeholder="Search city.."
                onChange={handleInputChange}
                value={search}
                debounceTimeout={300}
                loadOptions={loadOptions}
                className="bg-white text-black text-start p-1 border-0 w-full md:w-4/12 shadow-lg rounded-xl font-bold" 
            />
        </div>
    );
};