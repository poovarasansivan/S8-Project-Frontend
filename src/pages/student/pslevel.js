import React from "react";

const Categorychart = React.lazy(()=>import("../../components/pslevels/categorychart"));
const Pointshistory = React.lazy(()=>import("../../components/pslevels/pointshistory"));
const LevelStats = React.lazy(()=>import("../../components/pslevels/levelstatus"));
const SlotStatus = React.lazy(()=>import("../../components/pslevels/slotstatus"));

export default function pslevel() {
  return (
    <div className="w-full max-w-1xl rounded-md">
      <div className="mb-5 md:pl-2 md:pr-2">
        <LevelStats />
      </div>
      <div className="p-0 sm:p-2 ">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Column 1 */}
          <div className="lg:w-2/5 w-full space-y-6">
            <Pointshistory />
          </div>

          {/* Column 2 */}
          <div className="lg:w-3/5 w-full space-y-6">
            <Categorychart />
          </div>
        </div>
      </div>
      <SlotStatus />
    </div>
  );
}
