import { SocketProvider } from './contexts/SocketContext';
import Lobby from './components/Lobby';

function App() {
  return (
    <SocketProvider>
      <div className="App">
        <Lobby />
      </div>
    </SocketProvider>
  );
}

export default App;