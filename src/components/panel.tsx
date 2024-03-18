import React, { Suspense } from "react";
import { useContext, useState } from "react";
import { FullscreenPrompt } from "./ui";
import { MosaicContext } from "react-mosaic-component";
import { XMarkIcon } from "@heroicons/react/24/solid";

const userPanels = {};
const panels = {};
Object.entries(
  import.meta.glob("../panels/*.tsx", {
    import: "Component",
    eager: true,
  }),
).forEach(([panelPath, panelImport]) => {
  panels[panelPath] = panelImport();
});
Object.entries(
  import.meta.glob("../userPanels/*.tsx", {
    import: "Component",
    eager: true,
  }),
).forEach(([panelPath, panelImport]) => {
  userPanels[panelPath] = panelImport();
});

export function PanelToolbar({ title, path }: PanelToolbarProps) {
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

function PanelPreview({ panelComponentName, children }) {
  return (
    <div className="w-full h-auto bg-night-100 aspect-square">{children}</div>
  );
}

export function PanelChooser() {
  const standardPanels = [];
  const userPanels = [];
  for (let panelPath in panels) {
    standardPanels.push(
      <PanelPreview key={panelPath}>{panels[panelPath]}</PanelPreview>,
    );
  }
  for (let panelPath in userPanels) {
    userPanels.push(
      <PanelPreview key={panelPath}>{userPanels[panelPath]}</PanelPreview>,
    );
  }
  return (
    <FullscreenPrompt>
      <h2 className="text-2xl">Choose a new panel</h2>
      <br />
      <p className="text-lg">Standard Panels</p>
      <div className="grid grid-cols-5 gap-5 pt-5 pb-10">{standardPanels}</div>
      <p className="text-lg">User Panels</p>
      {userPanels.length === 0 ? (
        <p className="text-night-800">
          Theres nothing here... <br /> <br />
          If you're using the hosted version of Visum, you're out of luck.
          <br />
          If you're self hosting through Docker, mount your panel components to{" "}
          <code>/src/userPanels/</code>
        </p>
      ) : (
        <div className="grid grid-cols-5 gap-5 pt-5 pb-10">{userPanels}</div>
      )}
    </FullscreenPrompt>
  );
}

export function Panel({ panelPath }: string) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {panels["../panels/ros2djs.tsx"]}
    </Suspense>
  );
}
