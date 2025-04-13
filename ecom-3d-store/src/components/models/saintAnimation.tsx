// components/models/SaintModel.tsx
'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function SaintModel({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url);

  // Optional: play animation if any
  useEffect(() => {
    if (animations.length > 0) {
      // You can use useAnimations from drei to control it
    }
  }, [animations]);

  return <primitive object={scene} scale={0.5} />;
}
