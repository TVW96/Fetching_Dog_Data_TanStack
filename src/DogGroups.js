import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDogGroups = async () => {
    const { data } = await axios.get('https://dogapi.dog/api/v2/groups');
    return data;
};

const fetchBreeds = async () => {
    const { data } = await axios.get('https://dogapi.dog/api/v2/breeds');
    return data;
};

export function DogGroups() {
    const [hoveredGroupId, setHoveredGroupId] = useState(null);

    const { data: groupData, isError: groupError, isLoading: groupLoading } = useQuery({
        queryKey: ['group'],
        queryFn: fetchDogGroups,
    });

    const { data: breedData, isError: breedError, isLoading: breedLoading } = useQuery({
        queryKey: ['breed'],
        queryFn: fetchBreeds,
    });

    if (groupLoading || breedLoading) return <p>Loading dog groups and breeds...</p>;
    if (groupError || breedError) return <p>Error fetching data.</p>;

    const getBreedNamesByIds = (breedIds) => {
        if (!breedData || !breedData.data) return [];
        return breedIds
            .map((id) => breedData.data.find((breed) => breed.id === id)?.attributes.name)
            .filter(Boolean); // Filter out undefined names
    };

    return (
        <div className="page-info">
            <h2>Dog Groups</h2>
            <ul>
                {groupData.data.map((group) => {
                    const breedIds = group.relationships.breeds.data.map((breed) => breed.id);
                    const breedNames = getBreedNamesByIds(breedIds);

                    return (
                        <li
                            key={group.id}
                            onMouseEnter={() => setHoveredGroupId(group.id)}
                            onMouseLeave={() => setHoveredGroupId(null)}
                        >
                            <h3>{group.attributes.name}</h3>
                            {hoveredGroupId === group.id && (
                                <ul>
                                    <h5>Group Members: </h5>
                                    {breedNames.map((breedName, index) => (
                                        <li key={index} style={{
                                            color: 'black',
                                            backgroundColor: 'white',
                                            padding: '.5rem',
                                        }}><a href='./'>{breedName}</a></li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

