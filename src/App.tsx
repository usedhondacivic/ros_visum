import { Mosaic, MosaicWindow } from "react-mosaic-component";

import "react-mosaic-component/react-mosaic-component.css";

import { NavBar } from "./components/ui";
import { Panel, PanelToolbar } from "./components/panel";
import { ROSLibContextProvider } from "./components/roslibProvider";

export type ViewId = "a" | "b" | "c" | "new";

const TITLE_MAP: Record<ViewId, string> = {
  a: "Left Window",
  b: "Top Right Window",
  c: "Bottom Right Window",
  new: "New Window",
};

function App() {
  return (
    <ROSLibContextProvider>
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
            className="text-ivory"
          >
            <div className="w-full h-full">
              <Panel panelPath="../panels/ros3djs.tsx" />
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
    </ROSLibContextProvider>
  );
}

export default App;
