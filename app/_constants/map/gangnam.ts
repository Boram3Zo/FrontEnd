import { Region } from "../../_types/map";

export const gangnamGu: Region = {
  id: "gangnam",
  name: "강남구",
  color: "#a7f3d0",
  districts: [
    {
      id: "gangnam-1",
      name: "역삼동",
      neighborhoods: ["역삼1동", "역삼2동"],
    },
    {
      id: "gangnam-2",
      name: "삼성동",
      neighborhoods: ["삼성1동", "삼성2동"],
    },
  ],
};