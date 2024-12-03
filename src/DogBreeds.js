import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBreeds = async () => {
    const { data } = await axios.get('https://dogapi.dog/api/v2/breeds');
    return data;
};

export default function DogBreeds() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['breed'],
        queryFn: fetchBreeds,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching breeds.</p>;

    return (
        <div className='page-info'>
            <h1> Dog Breed Info</h1>
            <ul>
                {data.data.map((breed) => (
                    <li key={breed.id}>{breed.attributes.name}</li>
                ))}
            </ul>
        </div>
    );
}


