import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDogGroups = async () => {
    const { data } = await axios.get('https://dogapi.dog/api/v2/groups');
    return data;
};

export function DogGroups() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['group'],
        queryFn: fetchDogGroups,
    });
    if (isLoading) return <p>Loading dog groups...</p>;
    if (isError) return <p>Error fetching dog groups.</p>;

    return (
        <div className='page-info'>
            <h2>Dog Groups</h2>
            <ul>
                {data.data.map((group) => (
                    <li key={group.id}>{group.attributes.name}</li>
                ))}
            </ul>
        </div>
    );
}
