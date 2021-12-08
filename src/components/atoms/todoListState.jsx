import { atom } from "recoil";
import { DragDropObject } from "/src/DragDropObject";

export const todoListState = atom({
  key: "todoList_state",
  default: DragDropObject
});
