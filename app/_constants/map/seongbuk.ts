import { Region } from "../../_types/map";

export const seongbukGu: Region = {
  id: "seongbuk",
  name: "성북구",
  color: "#bae6fd",
  districts: [
    {
      id: "donam1",
      name: "돈암1동",
      neighborhoods: ["돈암1동"],
    },
    {
      id: "donam2",
      name: "돈암2동",
      neighborhoods: ["돈암2동"],
    },
    {
      id: "anam",
      name: "안암동",
      neighborhoods: ["안암동"],
    }
  ]
};