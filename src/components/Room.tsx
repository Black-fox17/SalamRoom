import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import type { Room as RoomType } from '../types';

interface RoomProps {
  room: RoomType;
}

export function Room({ room }: RoomProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const selectedFurniture = useStore((state) => state.selectedFurniture);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={selectedFurniture ? '#646cff' : '#1a1a1a'} />
      </mesh>
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