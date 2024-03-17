import { useContext, useState } from "react";
import {
  Mosaic,
  MosaicWindow,
  MosaicContext,
  MosaicBranch,
} from "react-mosaic-component";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

import "react-mosaic-component/react-mosaic-component.css";
import { Scrollbar } from "react-scrollbars-custom";

export type ViewId = "a" | "b" | "c" | "new";

const TITLE_MAP: Record<ViewId, string> = {
  a: "Left Window",
  b: "Top Right Window",
  c: "Bottom Right Window",
  new: "New Window",
};

interface PanelToolbarProps {
  title: string;
  path: MosaicBranch[];
}

function PanelToolbar({ title, path }: PanelToolbarProps) {
  let context = useContext(MosaicContext);
  return (
    <>
      <p className="text-night-800">{title}</p>
      <XMarkIcon
        className="h-3/4 inline-block ml-auto cursor-pointer"
        onClick={() => {
          context.mosaicActions.remove(path);
        }}
      />
    </>
  );
}

function NavBar() {
  return (
    <div className="w-full h-[3.5rem] bg-night-400 flex items-center pl-5 pr-5">
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

function PanelChooser() {
  const [visible, setVisible] = useState(false);
  if (!visible)
    return (
      <PlusIcon
        className="ml-auto h-1/2 cursor-pointer"
        onClick={() => {
          setVisible(true);
        }}
      />
    );
  const standardPanels = [];
  const userPanels = [];
  for (let i = 0; i < 9; i++) {
    standardPanels.push(
      <div className="w-full h-52 bg-night-100" key={i}></div>,
    );
    userPanels.push(<div className="w-full h-52 bg-night-100" key={i}></div>);
  }
  return (
    <div className="flex items-center justify-center w-full h-full absolute left-0 top-0 bg-night-100 bg-opacity-50 z-10">
      <div className="w-3/4 h-3/4 bg-night relative">
        <Scrollbar disableTracksWidthCompensation className="p-10">
          <div className="p-10 pr-14">
            <h2 className="text-2xl">Choose a new panel</h2>
            <br />
            <p className="text-lg">Standard Panels</p>
            <div className="grid grid-cols-5 gap-5 pt-5 pb-10">
              {standardPanels}
            </div>
            <p className="text-lg">User Extensions</p>
            <div className="grid grid-cols-5 gap-5 pt-5 pb-10">
              {userPanels}
            </div>
          </div>
        </Scrollbar>
        <XMarkIcon
          className="h-7 absolute right-5 top-5 cursor-pointer"
          onClick={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
}

// function Panel() {}

function App() {
  return (
    <>
      <NavBar />
      <Mosaic<ViewId>
        className="mosaic-visum-theme"
        renderTile={(id, path) => (
          <MosaicWindow<ViewId>
            path={path}
            createNode={() => "new"}
            title={TITLE_MAP[id]}
            renderToolbar={(props) => {
              return (
                <div className="flex w-full h-full items-center">
                  <PanelToolbar title={props.title} path={props.path} />
                </div>
              );
            }}
            className="text-night dark:text-ivory"
          >
            <div className="w-full h-full">
              <p>{TITLE_MAP[id]}</p>
            </div>
          </MosaicWindow>
        )}
        initialValue={{
          direction: "row",
          first: "a",
          second: {
            direction: "column",
            first: "b",
            second: "c",
          },
        }}
      />
    </>
  );
}

export default App;
