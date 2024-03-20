import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createContext, useContext, useState } from "react";
import ROSLIB from "roslib";

export type ROSLibInfoType = {
  ros: ROSLIB.Ros;
  rosBridgeServerAddr: string;
  gzServerAddr: string;
};

const initROSLibInfo: ROSLibInfoType = {
  ros: new ROSLIB.Ros({}),
  rosBridgeServerAddr: "ws://localhost:9090",
  gzServerAddr: "ws://localhost:9091",
};

export const ROSLibWriteContext = createContext<Function>(() => null);
export const ROSLibReadContext = createContext(initROSLibInfo);

export function ROSLibContextProvider({ children }: any) {
  const [ROSLibInfo, setROSLibInfo] = useState(initROSLibInfo);

  return (
    <ROSLibReadContext.Provider value={ROSLibInfo}>
      <ROSLibWriteContext.Provider value={setROSLibInfo}>
        {children}
      </ROSLibWriteContext.Provider>
    </ROSLibReadContext.Provider>
  );
}

export function ConnectionDialog() {
  const rosInfo = useContext(ROSLibReadContext);
  const setRosInfo = useContext(ROSLibWriteContext);
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ros_bridge">ROS Bridge Server</Label>
        <Input
          type="ros_bridge"
          placeholder="ws://localhost:9090"
          className="w-80 border-night-600"
          defaultValue={rosInfo.rosBridgeServerAddr}
          onChange={(e) => {
            setRosInfo({
              ...rosInfo,
              rosBridgeServerAddr: e.target.value,
            });
          }}
        />
      </div>
      <br />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="gazebo">(Optional) Gazebo Server</Label>
        <Input
          type="gazebo"
          placeholder="ws://localhost:9091"
          className="w-80 border-night-600"
          defaultValue={rosInfo.gzServerAddr}
          onChange={(e) => {
            setRosInfo({
              ...rosInfo,
              gzServerAddr: e.target.value,
            });
          }}
        />
      </div>
    </>
  );
}

export function ConnectionIndicator() {
  const rosInfo = useContext(ROSLibReadContext);
  return (
    <div className="text-night-900">
      <p className="text-xs">
        ROS Bridge Server ({rosInfo.rosBridgeServerAddr})
      </p>
      <p className="text-xs">Gazebo Server ({rosInfo.gzServerAddr}) </p>
    </div>
  );
}
