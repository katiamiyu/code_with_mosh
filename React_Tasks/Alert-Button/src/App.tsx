import { useState } from 'react';
import Alert from './components/Alert.tsx';
import Button from './components/Button.tsx';

function App() {
  const [isVisible, setVisibility] = useState(false);
  return (
    <>
      <div>
        {isVisible && <Alert onClick={() => setVisibility(false)}>Hello World</Alert>}
        <Button onClick={() => setVisibility(true)}>My Button</Button>
      </div>
    </>
  );
}

export default App;
