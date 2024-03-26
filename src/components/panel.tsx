import { MosaicContext, MosaicBranch } from "react-mosaic-component";
import { XMarkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { WindowManagerContext } from "./windowManager";

// TODO: fix this
type PanelImportType = { [key: string]: any };

export const panels = {
  standard: loadPanels(
    import.meta.glob("../panels/*.tsx", {
      import: "panel",
      eager: true,
    }),
  ),
  user: loadPanels(
    import.meta.glob("../userPanels/*.tsx", {
      import: "panel",
      eager: true,
    }),
  ),
};

function loadPanels(panelImport: PanelImportType) {
  const ret: PanelImportType = {};
  Object.entries(panelImport).forEach(([panelPath, panelImport]) => {
    ret[panelPath] = panelImport;
  });
  return ret;
}

type PanelToolbarProps = {
  title: string;
  path: MosaicBranch[];
};
export function PanelToolbar({ title, path }: PanelToolbarProps) {
  const mosaicContext = useContext(MosaicContext);
  return (
    <>
      <div className="w-full h-full overflow-ellipsis">
        <p className="text-night-800">{panels.standard[title].friendlyName}</p>
      </div>
      <XMarkIcon
        className="flex-shrink-0 aspect-square h-3/4 inline-block ml-auto cursor-pointer"
        onClick={() => {
          mosaicContext.mosaicActions.remove(path);
        }}
      />
    </>
  );
}

type PanelPreviewProps = {
  children: React.ReactNode;
  path: string;
};
function PanelPreview({ children, path }: PanelPreviewProps) {
  const WindowManagerInfo = useContext(WindowManagerContext);

  return (
    <div
      className="m-2 w-36 inline-block border-night-600 border-[1px] rounded-lg text-center aspect-square cursor-pointer"
      onClick={() => {
        WindowManagerInfo.addNewPanel(path);
      }}
    >
      {children}
    </div>
  );
}

export function PanelChooser() {
  const standardPanels: React.ReactNode[] = [];
  const userPanels: React.ReactNode[] = [];

  for (let panelPath in panels.standard) {
    standardPanels.push(
      <PanelPreview key={panelPath} path={panelPath}>
        {panels.standard[panelPath].preview({})}
      </PanelPreview>,
    );
  }
  for (let panelPath in panels.user) {
    userPanels.push(
      <PanelPreview key={panelPath} path={panelPath}>
        {panels.user[panelPath].preview({})}
      </PanelPreview>,
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
      {userPanels.length === 0 ? (
        <p className="text-night-800">Theres nothing here...</p>
      ) : (
        <div className="w-full grid grid-cols-5 gap-5 pt-5 pb-10">
          {userPanels}
        </div>
      )}
    </>
  );
}

type PanelProps = {
  panelPath: string;
};
export function Panel({ panelPath }: PanelProps) {
  return (
    <>
      {panels.standard[panelPath].component
        ? panels.standard[panelPath].component({})
        : panels.user[panelPath].component
          ? panels.user[panelPath].component({})
          : "You've requested a panel type doesn't exist.\n" +
            panelPath +
            " is not a file.\n" +
            "Make sure you've loaded all custom panels into the userPanels folder."}
    </>
  );
}
