import React from "react";
import { PanelChooser } from "./panel";

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
    <NavigationMenu className="pl-4 w-full h-[3.5rem]">
      <NavigationMenuList>
        <NavigationMenuItem className="mr-4">
          <NavigationMenuLink
            href="https://github.com/usedhondacivic/ros_visum"
            className="cursor-pointer hover:text-ivory text-night-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="text-3xl font-logo font-bold">ROS VISUM</h1>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer hover:text-ivory text-night-900 mx-4">
            <FullscreenPrompt
              title="Choose a new panel"
              triggerText="Add Panel"
            >
              <PanelChooser />
            </FullscreenPrompt>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer hover:text-ivory text-night-900 mx-4">
            <FullscreenPrompt
              title="Connections"
              triggerText="Manage Connections"
            >
              :)
            </FullscreenPrompt>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
      <DialogContent className="bg-night-100 max-w-5xl border-night-600">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] p-4">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
