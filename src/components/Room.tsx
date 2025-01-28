import { useRef } from 'react';
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

  // Load the room's image as a texture
  const roomTexture = useTexture(room.imageUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Room base (plane with texture) */}
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 3]} /> {/* Adjust dimensions as needed */}
        <meshStandardMaterial map={roomTexture} />
      </mesh>

      {/* Render furniture */}
      {room.furniture.map((furniture) => (
        <mesh
          key={furniture.id}
          position={[furniture.position.x, furniture.position.y, furniture.position.z]}
          rotation={[furniture.rotation.x, furniture.rotation.y, furniture.rotation.z]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      ))}
    </group>
  );
}
