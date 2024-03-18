import React from "react";
import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { PanelChooser } from "./panel";
import { Scrollbar } from "react-scrollbars-custom";

export function NavBar() {
  return (
    <div className="w-full h-[3.5rem] bg-night-100 flex items-center border-b-night-500 border-b-2 pl-5 pr-5">
      <h1 className="text-4xl font-logo text-night-900 font-bold">
        <a
          className="cursor-pointer hover:text-ivory"
          href="https://github.com/usedhondacivic/ros_visum"
          target="_blank"
          rel="noopener noreferrer"
        >
          ROS VISUM
        </a>
      </h1>
      <div className="ml-10">
        <p className="text-night-800">Connected to ROS-bridge on: </p>
        <p className="text-night-800">Connected to Gazebo-bridge on: </p>
      </div>
      <PanelChooser />
    </div>
  );
}

type FullscreenPromptProps = {
  children: React.ReactNode;
};
export function FullscreenPrompt({ children }: FullscreenPromptProps) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <PlusIcon
        className="ml-auto h-1/2 cursor-pointer"
        onClick={() => {
          setVisible(true);
        }}
      />

      {!visible ? (
        <></>
      ) : (
        <div className="flex items-center justify-center w-full h-full absolute left-0 top-0 bg-night-100 bg-opacity-50 z-10">
          <div className="w-3/4 h-3/4 bg-night relative">
            <Scrollbar disableTracksWidthCompensation className="p-10">
              <div className="p-10 pr-14">{children}</div>
            </Scrollbar>
            <XMarkIcon
              className="h-7 absolute right-5 top-5 cursor-pointer"
              onClick={() => {
                setVisible(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
