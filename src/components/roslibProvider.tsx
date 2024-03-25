import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createContext, useContext, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

import ROSLIB from "roslib";

export type ROSLibInfoType = {
  ros: ROSLIB.Ros;
  rosBridgeServerAddr: string;
  gzServerAddr: string;
  connected: boolean;
};

const initROSLibInfo: ROSLibInfoType = {
  ros: new ROSLIB.Ros({}),
  rosBridgeServerAddr: "ws://localhost:9090",
  gzServerAddr: "ws://localhost:9091",
  connected: false,
};

export const ROSLibWriteContext = createContext<Function>(() => null);
export const ROSLibReadContext = createContext(initROSLibInfo);

export function ROSLibContextProvider({ children }: any) {
  const [ROSLibInfo, setROSLibInfo] = useState(initROSLibInfo);

  ROSLibInfo.ros.connect(ROSLibInfo.rosBridgeServerAddr);
  ROSLibInfo.ros.on("connection", () => {
    setROSLibInfo({
      ...ROSLibInfo,
      connected: true,
    });
  });
  ROSLibInfo.ros.on("error", function (error) {
    console.log(error);
  });
  ROSLibInfo.ros.on("close", () => {
    setROSLibInfo({
      ...ROSLibInfo,
      connected: false,
    });
  });
  return (
    <ROSLibReadContext.Provider value={ROSLibInfo}>
      <ROSLibWriteContext.Provider value={setROSLibInfo}>
        {children}
      </ROSLibWriteContext.Provider>
    </ROSLibReadContext.Provider>
  );
}

export function ConnectionDialog() {
  const ROSLibInfo = useContext(ROSLibReadContext);
  const setROSLibInfo = useContext(ROSLibWriteContext);
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ros_bridge">ROS Bridge Server</Label>
        <Input
          type="ros_bridge"
          placeholder="ws://localhost:9090"
          className={"w-80 border-night-600"}
          defaultValue={ROSLibInfo.rosBridgeServerAddr}
          onChange={(e) => {
            setROSLibInfo({
              ...ROSLibInfo,
              rosBridgeServerAddr: e.target.value,
            });

            ROSLibInfo.ros.close();
            ROSLibInfo.ros.connect(ROSLibInfo.rosBridgeServerAddr);
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
          defaultValue={ROSLibInfo.gzServerAddr}
          onChange={(e) => {
            setROSLibInfo({
              ...ROSLibInfo,
              gzServerAddr: e.target.value,
            });
          }}
        />
      </div>
    </>
  );
}

export function ConnectionIndicator() {
  const ROSLibInfo = useContext(ROSLibReadContext);
  return (
    <div className="text-night-900">
      <div className="flex justify-start content-center">
        <p className={"text-xs inline-block mr-2"}>
          ROS Bridge Server ({ROSLibInfo.rosBridgeServerAddr})
        </p>
        {ROSLibInfo.connected ? (
          <CheckCircleIcon className="text-lime-500 h-4 inline-block" />
        ) : (
          <XCircleIcon className="text-flame-500 h-4 inline-block" />
        )}
      </div>
      <div className="flex justify-start content-center">
        <p className={"text-xs inline-block mr-2"}>
          Gazebo Server ({ROSLibInfo.gzServerAddr}){" "}
        </p>
        {ROSLibInfo.connected ? (
          <CheckCircleIcon className="text-lime-500 h-4 inline-block" />
        ) : (
          <XCircleIcon className="text-flame-500 h-4 inline-block" />
        )}
      </div>
    </div>
  );
}
