export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface District {
  id: string;
  name: string;
  neighborhoods?: string[];
}

export interface Region {
  id: string;
  name: string;
  color: string;
  districts?: District[];
}