import React from "react";
const Placementstats = React.lazy(() => import("../components/placement/jobstats"));
const Placementrecords = React.lazy(()=> import("../components/placement/placementrecord"));
const FullStackrank4 = React.lazy(()=> import("../components/placement/fullstackrank4"));
const FullStackrank3 = React.lazy(()=> import("../components/placement/fullstackrank3"));
const Pipelinedcompany = React.lazy(()=> import("../components/placement/pipelinedcompany"));
const Fullstackanalysis = React.lazy(()=>import("../components/placement/fullstackpoints"));

const Dashboard = () => {
  return (
    <div className="p-0 sm:p-2 grid grid-cols-1 ">
      <Placementstats />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-5 gap-6">
          <FullStackrank4 />
          <FullStackrank3 />
        </div>
        <div className="mt-5">
          <Fullstackanalysis/>
        </div>
        <div className="mt-5">
          <Pipelinedcompany/>
        </div>
        <Placementrecords />
      </div>
    </div>
  );
};

export default Dashboard;
