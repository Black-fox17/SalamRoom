export interface Room {
  id: string;
  name: string;
  imageUrl: string;
  style: string;
  furniture: Furniture[];
  userId: string;
  createdAt: string;
}

export interface Furniture {
  id: string;
  name: string;
  type: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  model: string;
}