import React, { useEffect, useState } from "react";

function MemoryFree() {
  const [free, setFree] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await fetch("/api/v1/memory/free");
      const data = await result.json();
      setFree(data);
    })();
  }, []);
  return <div>Free: {free} GB</div>;
}

export default MemoryFree;
