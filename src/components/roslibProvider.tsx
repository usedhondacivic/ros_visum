import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createContext, useContext } from "react";
import ROSLIB from "roslib";

const ROSLibInfo = {
  ros: new ROSLIB.Ros({}),
  rosBridgeServerAddr: "ws://localhost:9090",
  gzServerAddr: "ws://localhost:9091",
};

export const ROSLibContext = createContext(ROSLibInfo);

export function ROSLibContextProvider({ children }: any) {
  const rosInfo = useContext(ROSLibContext);
  return (
    <ROSLibContext.Provider value={rosInfo}>{children}</ROSLibContext.Provider>
  );
}

export function ConnectionDialog() {
  const rosInfo = useContext(ROSLibContext);
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ros_bridge">ROS Bridge Server</Label>
        <Input
          type="ros_bridge"
          placeholder="ws://localhost:9090"
          className="border-night-600"
          defaultValue={rosInfo.rosBridgeServerAddr}
          onChange={(e) => {
            rosInfo.rosBridgeServerAddr = e.target.value;
          }}
        />
      </div>
      <br />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="gazebo">(Optional) Gazebo Server</Label>
        <Input
          type="gazebo"
          placeholder="ws://localhost:9091"
          className="border-night-600"
          defaultValue={rosInfo.gzServerAddr}
          onChange={(e) => {
            rosInfo.gzServerAddr = e.target.value;
          }}
        />
      </div>
    </>
  );
}

export function ConnectionIndicator() {
  const rosInfo = useContext(ROSLibContext);
  return (
    <div className="text-night-900">
      <p className="text-xs">
        ROS Bridge Server ({rosInfo.rosBridgeServerAddr})
      </p>
      <p className="text-xs">Gazebo Server ({rosInfo.gzServerAddr}) </p>
    </div>
  );
}
