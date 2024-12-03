import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchBreedDetails = async ({ queryKey }) => {
    const [, breedId] = queryKey;
    const { data } = await axios.get(`https://dogapi.dog/api/v2/breeds/${breedId}`);
    return data;
};

export default function BreedDetails({ breedId }) {
    const { data, isLoading, isError } = useQuery(['breedDetails', breedId], fetchBreedDetails);

    if (isLoading) return <p>Loading breed details...</p>;
    if (isError) return <p>Error fetching breed details.</p>;

    const { name, description, ...attributes } = data.data.attributes;

    return (
        <div className='page-info'>
            <h3>{name}</h3>
            <p>{description}</p>
            <ul>
                {Object.entries(attributes).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
