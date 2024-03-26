import {
  Mosaic,
  MosaicNode,
  MosaicWindow,
  getLeaves,
  updateTree,
} from "react-mosaic-component";

import { createContext, useState, useContext } from "react";

import "react-mosaic-component/react-mosaic-component.css";

import { NavBar } from "./ui";
import { Panel, PanelToolbar } from "./panel";

const initWindowManagerContext: {
  addNewPanel: (path: string) => void;
} = {
  addNewPanel: () => {},
};

export const WindowManagerContext = createContext(initWindowManagerContext);

export default function WindowManager() {
  const [state, setState]: [{ currentNode: MosaicNode<string> }, Function] =
    useState({
      currentNode: {
        direction: "row",
        first: "../panels/ros3djs.tsx",
        second: {
          direction: "column",
          first: "../panels/image.tsx",
          second: "../panels/gazebo.tsx",
        },
      },
    });

  const onChange = (currentNode: MosaicNode<string> | null) => {
    setState({ currentNode });
  };
  const onRelease = () => {};

  const WindowManagerInfo = useContext(WindowManagerContext);
  WindowManagerInfo.addNewPanel = (path: string) => {
    const totalWindowCount = getLeaves(state.currentNode).length;
    if (state.currentNode) {
      setState({
        ...state,
        currentNode: updateTree(state.currentNode, [
          {
            path: [],
            spec: {
              $set: {
                direction: "row",
                first: totalWindowCount + "-" + path,
                second: state.currentNode,
              },
            },
          },
        ]),
      });
    } else {
      setState({
        ...state,
        currentNode: path,
      });
    }
  };

  return (
    <>
      <NavBar />
      <Mosaic<string>
        className="mosaic-visum-theme"
        onChange={onChange}
        onRelease={onRelease}
        renderTile={(id, path) => (
          <MosaicWindow<string>
            path={path}
            title={id.substring(id.indexOf("-") + 1)}
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
              <Panel panelPath={id.substring(id.indexOf("-") + 1)} />
            </div>
          </MosaicWindow>
        )}
        value={state.currentNode}
      />
    </>
  );
}
