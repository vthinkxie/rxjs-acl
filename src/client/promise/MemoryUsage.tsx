import React, { useEffect, useState } from "react";

function MemoryUsage() {
  const [usage, setUsage] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await fetch("/api/v1/memory/usage");
      const data = await result.json();
      setUsage(data);
    })();
  }, []);
  return <div>Usage: {usage} GB</div>;
}

export default MemoryUsage;
