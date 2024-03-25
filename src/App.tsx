import { Mosaic, MosaicWindow } from "react-mosaic-component";

import "react-mosaic-component/react-mosaic-component.css";

import { NavBar } from "./components/ui";
import { Panel, PanelToolbar } from "./components/panel";
import { ROSLibContextProvider } from "./components/roslibProvider";

type panelInfoType = {
  title: string;
  path: string;
};
const panels: panelInfoType[] = [
  {
    title: "3D View",
    path: "../panels/ros3djs.tsx",
  },
  {
    title: "Image",
    path: "../panels/image.tsx",
  },
  {
    title: "Gazebo Sim",
    path: "../panels/gazebo.tsx",
  },
];

function App() {
  return (
    <ROSLibContextProvider>
      <NavBar />
      <Mosaic<number>
        className="mosaic-visum-theme"
        renderTile={(id, path) => (
          <MosaicWindow<number>
            path={path}
            title={panels[id].title}
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
              <Panel panelPath={panels[id].path} />
            </div>
          </MosaicWindow>
        )}
        initialValue={{
          direction: "row",
          first: 0,
          second: {
            direction: "column",
            first: 1,
            second: 2,
          },
        }}
      />
    </ROSLibContextProvider>
  );
}

export default App;
