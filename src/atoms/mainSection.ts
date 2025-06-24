"use client";
import { atom } from "recoil";
interface IsectionState {
  sections: Section[];
}
interface Section {
  top: number;
}
export const sectionState = atom<IsectionState>({
  key: "sectionState",
  default: { sections: [] },
});
