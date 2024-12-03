import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const fetchBreedDetails = async ({ queryKey }) => {
    const [, breedId] = queryKey; // Extract breedId from queryKey
    const { data } = await axios.get(`https://dogapi.dog/api/v2/breeds/${breedId}`);
    return data;
};

export default function BreedDetails() {
    const { id: breedId } = useParams(); // Get breedId from URL
    const { data, isLoading, isError } = useQuery({
        queryKey: ['breedDetails', breedId],
        queryFn: fetchBreedDetails,
    });

    if (isLoading) return <p>Loading breed details...</p>;
    if (isError) return <p>Error fetching breed details.</p>;

    const { name, description, life, hypoallergenic } = data.data.attributes;
    console.log(data.data.attributes); // for debuggig API call

    return (
        <div className="page-info">
            <h3>{name}</h3>
            <p>{description}</p>
            <ul>
                {life && life.min && (
                    <li>
                        <strong>Minimum Life:</strong> {life.min} years
                    </li>
                )}
                {life && life.max && (
                    <li>
                        <strong>Maximum Life:</strong> {life.max} years
                    </li>
                )}
                <li>
                    <strong>Hypoallergenic:</strong> {hypoallergenic ? 'Yes' : 'No'}
                </li>
            </ul>
        </div>
    );
}

