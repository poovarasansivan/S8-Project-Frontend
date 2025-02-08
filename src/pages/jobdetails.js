import React from "react";
const OverviewCard = React.lazy(() => import("../components/jobdetails/roleoverview"));
const JobDescription = React.lazy(() => import("../components/jobdetails/jobdescription"));
const JobHeader = React.lazy(() => import("../components/jobdetails/jobheader"));
const CompanyProfileCard = React.lazy(() => import("../components/jobdetails/companydetails"));

export default function JobDetails() {
  return ( 
    <div className="min-h-screen p-4 ">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[350px,1fr]">
          {/* Left Sidebar */}
          <div className="space-y-6">
          <CompanyProfileCard />
            <OverviewCard />
          </div>

          {/* Main Content */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <JobHeader />
            <JobDescription />
          </div>
        </div>
      </div>
    </div>
  );
}
