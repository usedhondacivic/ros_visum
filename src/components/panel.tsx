import React from "react";
import { FullscreenPrompt } from "./ui";
import { MosaicContext, MosaicBranch } from "react-mosaic-component";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

const userPanels: { [key: string]: React.FC } = {};
const panels: { [key: string]: React.FC } = {};

type PanelImport = { [key: string]: React.FC };
const panelImport: PanelImport = import.meta.glob("../panels/*.tsx", {
  import: "Component",
  eager: true,
});
const userPanelImport: PanelImport = import.meta.glob("../userPanels/*.tsx", {
  import: "Component",
  eager: true,
});

Object.entries(panelImport).forEach(([panelPath, panelImport]) => {
  panels[panelPath] = panelImport;
});
Object.entries(userPanelImport).forEach(([panelPath, panelImport]) => {
  userPanels[panelPath] = panelImport;
});

type PanelToolbarProps = {
  title: string;
  path: MosaicBranch[];
};
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

type PanelPreviewProps = {
  panelComponentName?: string;
  children: React.ReactNode;
};
function PanelPreview({ children }: PanelPreviewProps) {
  return (
    <div className="w-full h-auto bg-night-100 aspect-square">{children}</div>
  );
}

export function PanelChooser() {
  const standardPanels: React.ReactNode[] = [];
  const customPanels: React.ReactNode[] = [];
  for (let panelPath in panels) {
    if (!panels[panelPath]) continue;
    standardPanels.push(
      <PanelPreview key={panelPath}>{panels[panelPath]({})}</PanelPreview>,
    );
  }
  for (let panelPath in userPanels) {
    if (!userPanels[panelPath]) continue;
    customPanels.push(
      <PanelPreview key={panelPath}>{userPanels[panelPath]({})}</PanelPreview>,
    );
  }
  return (
    <FullscreenPrompt>
      <h2 className="text-2xl">Choose a new panel</h2>
      <br />
      <p className="text-lg">Standard Panels</p>
      <div className="grid grid-cols-5 gap-5 pt-5 pb-10">{standardPanels}</div>
      <p className="text-lg">User Panels</p>
      {customPanels.length === 0 ? (
        <p className="text-night-800">
          Theres nothing here... <br /> <br />
          If you're using the hosted version of Visum, you're out of luck.
          <br />
          If you're self hosting through Docker, mount your panel components to{" "}
          <code>/src/userPanels/</code>
        </p>
      ) : (
        <div className="grid grid-cols-5 gap-5 pt-5 pb-10">{customPanels}</div>
      )}
    </FullscreenPrompt>
  );
}

type PanelProps = {
  panelPath: string;
};
export function Panel({ panelPath }: PanelProps) {
  return <>{panels[panelPath]({})}</>;
}
