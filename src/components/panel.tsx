import React from "react";
import { MosaicContext, MosaicBranch } from "react-mosaic-component";
import { XMarkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
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
  children: React.ReactNode;
};
function PanelPreview({ children }: PanelPreviewProps) {
  return (
    <div className="m-2 w-36 inline-block border-night-600 border-[1px] rounded-lg text-center aspect-square">
      {children}
    </div>
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
    <>
      <p className="text-lg">Standard Panels</p>
      <div className="w-full flex flex-row flex-wrap justify-center">
        {standardPanels}
      </div>
      <div className="flex items-center">
        <p className="text-lg inline">User Panels</p>
        <a
          href="https://github.com/usedhondacivic/ros_visum/tree/main/src/userPanels"
          target="_blank"
          rel="noopener noreferrer"
        >
          <QuestionMarkCircleIcon className="h-4 ml-1 mb-1 opacity-50 inline-block" />
        </a>
      </div>
      {customPanels.length === 0 ? (
        <p className="text-night-800">Theres nothing here...</p>
      ) : (
        <div className="w-full grid grid-cols-5 gap-5 pt-5 pb-10">
          {customPanels}
        </div>
      )}
    </>
  );
}

type PanelProps = {
  panelPath: string;
};
export function Panel({ panelPath }: PanelProps) {
  return <>{panels[panelPath]({})}</>;
}
