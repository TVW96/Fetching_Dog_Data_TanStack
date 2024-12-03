import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DogApp from './DogApp';
import "./styles.sass"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='layout'>
        <DogApp />
      </div>
    </QueryClientProvider>
  );
}

export default App;
