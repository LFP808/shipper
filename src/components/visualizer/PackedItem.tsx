'use client'

import { useState } from 'react'
import { Html } from '@react-three/drei'
import type { PlacedItem } from '@/lib/packing/types'

interface Props {
  placedItem: PlacedItem
  boxLength: number
  boxWidth: number
  boxHeight: number
}

export function PackedItem({ placedItem, boxLength, boxWidth, boxHeight }: Props) {
  const [hovered, setHovered] = useState(false)
  const { x, y, z, length, width, height, color, itemName } = placedItem

  // Center the box at origin: offset each item by half the box dims
  const cx = x + length / 2 - boxLength / 2
  const cy = y + height / 2 - boxHeight / 2
  const cz = z + width / 2 - boxWidth / 2

  return (
    <mesh
      position={[cx, cy, cz]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[length, height, width]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={hovered ? 0.92 : 0.78}
        roughness={0.4}
        metalness={0.1}
      />
      {hovered && (
        <Html distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div className="bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
            <p className="font-semibold">{itemName}</p>
            <p className="text-slate-300">{length.toFixed(1)}″ × {width.toFixed(1)}″ × {height.toFixed(1)}″</p>
            <p className="text-slate-400 text-[10px]">
              at ({x.toFixed(1)}, {y.toFixed(1)}, {z.toFixed(1)})
            </p>
          </div>
        </Html>
      )}
    </mesh>
  )
}
