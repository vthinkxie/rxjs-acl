import React, { useEffect, useState } from "react";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const free = await fetch("/api/v1/memory/free");
      const freeData = await free.json();
      const usage = await fetch("/api/v1/memory/usage");
      const usageData = await usage.json();
      setPercent(+((usageData / (usageData + freeData)) * 100).toFixed(2));
    })();
  }, []);
  return <div>Usage Percent: {percent} %</div>;
}

export default MemoryUsagePercent;
