import { SocketContext } from './contexts/SocketContext';
import Lobby from './components/Lobby';

function App() {
  return (
    <SocketContext.Provider>
      <div className="App">
        <Lobby />
      </div>
    </SocketContext.Provider>
  );
}

export default App;