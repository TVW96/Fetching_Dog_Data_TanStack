import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchBreeds = async () => {
    const { data } = await axios.get('https://dogapi.dog/api/v2/breeds');
    return data;
};

export default function DogBreeds() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['breed'],
        queryFn: fetchBreeds,
    });

    const [hoveredBreedId, setHoveredBreedId] = useState(null);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching breeds.</p>;

    return (
        <div className='page-info'>
            <h1> Dog Breed Info</h1>
            <ul>
                {data.data.map((breed) => (
                    <li
                        key={breed.id}
                        onMouseEnter={() => setHoveredBreedId(breed.id)}
                        onMouseLeave={() => setHoveredBreedId(null)}
                    >
                        {breed.attributes.name}
                    </li>
                ))}
            </ul>

            {hoveredBreedId ? (
                <div className="hover-details">
                    {data.data.map((breed) =>
                        breed.id === hoveredBreedId ? (
                            <div key={breed.id}>
                                <h2 style={{
                                    textDecoration: "underline"
                                }}>{breed.attributes.name}</h2>
                                <p>{breed.attributes.description}</p>
                            </div>
                        ) : null
                    )}
                </div>
            ) : null}
        </div >
    );
}


