import React from "react";
import { PanelChooser } from "./panel";
import { ConnectionDialog, ConnectionIndicator } from "./roslibProvider";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";

export function NavBar() {
  return (
    <div className="w-full border-b-[1px] border-night-800 h-[3.5rem]">
      <NavigationMenu className="h-full">
        <NavigationMenuList className="w-[100vw] px-4 justify-between">
          <NavigationMenuItem className="w-[30vw] whitespace-nowrap">
            <ConnectionIndicator />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="https://github.com/usedhondacivic/ros_visum"
              className="cursor-pointer hover:text-night-900 text-ivory"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className="text-3xl font-logo font-bold whitespace-nowrap">
                ROS VISUM
              </h1>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <div className="w-[30vw] pl-auto whitespace-nowrap">
            <div className="float-end">
              <NavigationMenuItem className="inline-block">
                <NavigationMenuLink className="cursor-pointer hover:text-ivory text-night-900 mx-4">
                  <FullscreenPrompt
                    title="Choose a new panel"
                    triggerText="Add Panel"
                  >
                    <PanelChooser />
                  </FullscreenPrompt>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="inline-block">
                <NavigationMenuLink className="cursor-pointer hover:text-ivory text-night-900 ml-4">
                  <FullscreenPrompt
                    title="Connections"
                    triggerText="Manage Connections"
                  >
                    <ConnectionDialog />
                  </FullscreenPrompt>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

type FullscreenPromptProps = {
  triggerText: string;
  title: string;
  children?: React.ReactNode;
};

export function FullscreenPrompt({
  triggerText,
  title,
  children,
}: FullscreenPromptProps) {
  return (
    <Dialog>
      <DialogTrigger>{triggerText}</DialogTrigger>
      <DialogContent className="max-w-full w-max bg-night-100 border-night-600">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] p-4">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
