import { useState } from 'react';
import Alert from './components/Alert.tsx';
function App() {
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <div>
      {alertVisible && (
        <Alert onClose={()=>setAlertVisible(false)}>
          <strong>Holy guacamole!</strong>You should get a Job.
        </Alert>
      )}
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => setAlertVisible(true)}
      >
        Advice
      </button>
    </div>
  );
}

export default App;
