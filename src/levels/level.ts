import { IRender } from "../engine/renderer";

export interface ILevel extends IRender {
    start: () => void;
    end: () => void;
}