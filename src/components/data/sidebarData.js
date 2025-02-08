import {
  LayoutDashboard,
  BadgeHelp,
} from "lucide-react";
import { SiCoursera } from "react-icons/si";
import { HiOutlineHome } from "react-icons/hi2";
import { RiStackLine } from "react-icons/ri";
import { SiCompilerexplorer } from "react-icons/si";
import { SiTask } from "react-icons/si";
import { FaRegEdit } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

export const sidebarData = [
  {
    section: "Home",
    items: [
      {
        icon: LayoutDashboard,
        label: "Home Page",
        route: "/home",
        roles:["1"]
      },
      {
        icon: FaRegEdit,
        label: "Add Details",
        route: "/add-details",
        roles:["1"]
      },
      {
        icon: HiOutlineHome,
        label: "Student Home Page",
        route: "/student-home",
        roles:["3"]
      },
      {
        icon: HiOutlineHome,
        label: "Home Page",
        route: "/home",
        roles:["2"]
      },
      {
        icon: SiCoursera,
        label: "PS Details",
        route: "/ps-details",
        roles:["3"]
      },
      {
        icon: RiStackLine,
        label: "Full Stack",
        route: "/full-stack",
        roles:["3"]
      },
      {
        icon: RiStackLine,
        label: "Full Stack ",
        route: "/full-stack-details",
        roles:["1","2"]
      },
      {
        icon: SiTask,
        label: "PS Details ",
        route: "/faculty-ps-details",
        roles:["1","2"]
      },
      {
        icon: SiCompilerexplorer,
        label: "Technical",
        route: "/technical-performance",
        roles:["1","2"]
      },
      {
        icon: FaRegUserCircle,
        label: "profiles",
        route: "/student-profiles",
        roles:["1","2"]
      },
      {
        icon: SiCompilerexplorer,
        label: "Technical Performance",
        items: [
          { label: "Leet Code", route: "/technical/leetcode-performance",roles:["3"] },
          { label: "Github", route: "/technical/github-performance",roles:["3"]  },
        ],
        roles:["3"]
      },
    ],
  },
 
  {
    section: "Settings",
    items: [
      {
        icon: BadgeHelp,
        label: "Profile",
        route: "/profile"
      },
    ],
    roles:["1","2","3"]
  },
];


