import MemoryFree from "./MemoryFree";
import MemoryUsage from "./MemoryUsage";
import MemoryUsagePercent from "./MemoryUsagePercent";
import React from "react";

function MemoryPromise() {
  return (
    <div>
      <MemoryFree />
      <br />
      <MemoryUsage />
      <br />
      <MemoryUsagePercent />
    </div>
  );
}

export default MemoryPromise;
