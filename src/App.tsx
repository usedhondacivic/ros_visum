import { useContext, useState } from "react";
import {
  Mosaic,
  MosaicWindow,
  MosaicContext,
  MosaicBranch,
} from "react-mosaic-component";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

import "react-mosaic-component/react-mosaic-component.css";

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

function PanelToolbar({ title, path }: PaneltoobarProps) {
  let context = useContext(MosaicContext);
  return (
    <>
      {title}
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
      <h1 className="text-4xl font-logo font-bold">ROS VISUM</h1>
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
  return (
    <div className="flex items-center justify-center w-full h-full absolute left-0 top-0 bg-night-100 bg-opacity-50 z-10">
      <div className="w-3/4 h-3/4 bg-night p-10 relative">
        <h2 className="text-2xl">Choose a new panel</h2>
        <br />
        <p className="text-lg">Standard Panels</p>

        <div></div>
        <p className="text-lg">User Extensions</p>
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

function Panel() {}

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
