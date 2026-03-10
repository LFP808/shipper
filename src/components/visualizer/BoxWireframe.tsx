'use client'

import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import type { Box } from '@/lib/packing/types'

interface Props {
  box: Box
}

export function BoxWireframe({ box }: Props) {
  const { length, width, height } = box

  const { edges, faceMaterial } = useMemo(() => {
    const geo = new THREE.BoxGeometry(length, height, width)
    const edges = new THREE.EdgesGeometry(geo)
    geo.dispose() // source geometry no longer needed after edges are extracted
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: '#94a3b8',
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    })
    return { edges, faceMaterial }
  }, [length, width, height])

  useEffect(() => {
    return () => {
      edges.dispose()
      faceMaterial.dispose()
    }
  }, [edges, faceMaterial])

  return (
    <group>
      <mesh material={faceMaterial}>
        <boxGeometry args={[length, height, width]} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#64748b" />
      </lineSegments>
    </group>
  )
}
