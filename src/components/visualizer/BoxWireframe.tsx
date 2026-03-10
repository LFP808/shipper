'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import type { Box } from '@/lib/packing/types'

interface Props {
  box: Box
}

export function BoxWireframe({ box }: Props) {
  const { length, width, height } = box

  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(length, height, width)
    return new THREE.EdgesGeometry(geo)
  }, [length, width, height])

  return (
    <group>
      {/* Transparent fill */}
      <mesh>
        <boxGeometry args={[length, height, width]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      {/* Wireframe edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#64748b" linewidth={2} />
      </lineSegments>
    </group>
  )
}
