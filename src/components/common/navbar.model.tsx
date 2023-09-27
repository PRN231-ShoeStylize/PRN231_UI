import { JSXElement } from "@babel/types";

export interface IMainNavBarProps {
  items : IMainNavBarProp[]
}

export interface IMainNavBarProp{
    icon: React.FC,
    label: string
}