import React from "react";
import MemoryPromise from "./promise/MemoryPromise";
import MemoryObservable from "./observable/MemoryObservable";

function App() {
  return (
    <div>
      <MemoryPromise />
      <br />
      <MemoryObservable />
    </div>
  );
}

export default App;
