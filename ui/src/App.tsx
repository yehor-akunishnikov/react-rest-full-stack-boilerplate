import { useState } from "react";

import "./App.css";
import { MyButton } from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyButton
        label={String(count)}
        onClick={() => setCount(count + 1)}
      />
    </>
  );
}

export default App;
