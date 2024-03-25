import React, { useEffect, useRef } from "react";
import {
  MosaicContext,
  MosaicBranch,
  updateTree,
} from "react-mosaic-component";
import { XMarkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

type PanelImportType = { [key: string]: React.FC };

const panels = {
  standard: {
    components: loadPanels(
      import.meta.glob("../panels/*.tsx", {
        import: "Component",
        eager: true,
      }),
    ),
    previews: loadPanels(
      import.meta.glob("../panels/*.tsx", {
        import: "Preview",
        eager: true,
      }),
    ),
  },
  user: {
    components: loadPanels(
      import.meta.glob("../userPanels/*.tsx", {
        import: "Component",
        eager: true,
      }),
    ),

    previews: loadPanels(
      import.meta.glob("../userPanels/*.tsx", {
        import: "Preview",
        eager: true,
      }),
    ),
  },
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
      <p className="text-night-800">{title}</p>
      <XMarkIcon
        className="h-3/4 inline-block ml-auto cursor-pointer"
        onClick={() => {
          mosaicContext.mosaicActions.remove(path);
        }}
      />
    </>
  );
}

type PanelPreviewProps = {
  children: React.ReactNode;
};
function PanelPreview({ children }: PanelPreviewProps) {
  const mosaicContext = useContext(MosaicContext);
  const previewRef: any = useRef(null);
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.addEventListener("click", () => {
        let root = mosaicContext.mosaicActions.getRoot();
        //     mosaicContext.mosaicActions.updateTree(root, [{
        // [],
        // spec: {
        // 	}
        // }]);
        updateTree(root ? root : "new", [
          {
            path: [],
            spec: {
              $set: {
                direction: "column",
                first: "new",
                second: root ? root : "new",
              },
            },
          },
        ]);
      });
    }
  }, []);

  return (
    <div
      ref={previewRef}
      className="m-2 w-36 inline-block border-night-600 border-[1px] rounded-lg text-center aspect-square cursor-pointer"
    >
      {children}
    </div>
  );
}

export function PanelChooser() {
  const standardPanels: React.ReactNode[] = [];
  const userPanels: React.ReactNode[] = [];

  for (let panelPath in panels.standard.previews) {
    standardPanels.push(
      <PanelPreview key={panelPath}>
        {panels.standard.previews[panelPath]({})}
      </PanelPreview>,
    );
  }
  for (let panelPath in panels.user.previews) {
    userPanels.push(
      <PanelPreview key={panelPath}>
        {panels.user.previews[panelPath]({})}
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
      {panels.standard.components[panelPath]
        ? panels.standard.components[panelPath]({})
        : panels.user.components[panelPath]
          ? panels.user.components[panelPath]({})
          : "You've requested a panel type that doesn't exist. Make sure you've loaded all custom panels into the userPanels folder."}
    </>
  );
}
