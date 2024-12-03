import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDogFacts = async () => {
    const { data } = await axios.get('https://dogapi.dog/api/v2/facts');
    return data;
};

export function DogFacts() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['fact'],
        queryFn: fetchDogFacts,
    });
    if (isLoading) return <p>Loading dog facts...</p>;
    if (isError) return <p>Failed to fetch dog facts.</p>;

    return (
        <div className='page-info'>
            <h1>Dog Facts</h1>
            <ul>
                {data.data.map((fact) => (
                    <h2 key={fact.id}>"{fact.attributes.body}"</h2>
                ))}
            </ul>
        </div>
    );
}
