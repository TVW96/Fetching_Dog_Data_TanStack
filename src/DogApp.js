import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DogBreeds from './DogBreeds';
import BreedDetails from './BreedDetails';
import { DogFacts } from './DogFacts';
import { DogGroups } from './DogGroups';

function DogApp() {
    return (
        <Router>
            <div className='grid-layout'>
                <h1 id='page-title'>DOG API APP</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/facts">Facts</Link>
                    <Link to="/groups">Groups</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<DogBreeds />} />
                    <Route path="/breed/:id" element={<BreedDetails />} />
                    <Route path="/facts" element={<DogFacts />} />
                    <Route path="/groups" element={<DogGroups />} />
                </Routes>
            </div>
        </Router>
    );
}

export default DogApp;
