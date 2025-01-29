import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { useTexture } from '@react-three/drei';
import type { Room as RoomType } from '../types';

interface RoomProps {
  room: RoomType;
}

export function Room({ room }: RoomProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const selectedFurniture = useStore((state) => state.selectedFurniture);
  const roomTexture = useTexture(room.imageUrl);
  const [aspectRatio, setAspectRatio] = useState(1);

  // Calculate aspect ratio when texture loads
  useEffect(() => {
    if (roomTexture?.image) {
      const img = roomTexture.image;
      setAspectRatio(img.width / img.height);
    }
  }, [roomTexture]);

  return (
    <group>
      {/* Background plane with dynamic aspect ratio */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={[5, 5 / aspectRatio, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={roomTexture} />
      </mesh>

      {/* Furniture items */}
      {room.furniture.map((furniture) => (
        <mesh
          key={furniture.id}
          position={[
            furniture.position.x,
            furniture.position.y,
            furniture.position.z,
          ]}
          rotation={[
            furniture.rotation.x,
            furniture.rotation.y,
            furniture.rotation.z,
          ]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      ))}
    </group>
  );
}