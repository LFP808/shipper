import type { Box, Item, PackResult, PlacedItem } from './types'
import { STANDARD_BOXES } from './boxes'

const ITEM_COLORS = [
  '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16',
  '#6366f1', '#e11d48',
]

interface Point3D { x: number; y: number; z: number }

function getVolume(l: number, w: number, h: number) {
  return l * w * h
}

// Returns unique rotations (permutations of l/w/h)
function getRotations(item: Item): [number, number, number][] {
  const dims = [item.length, item.width, item.height]
  const perms: [number, number, number][] = [
    [dims[0], dims[1], dims[2]],
    [dims[0], dims[2], dims[1]],
    [dims[1], dims[0], dims[2]],
    [dims[1], dims[2], dims[0]],
    [dims[2], dims[0], dims[1]],
    [dims[2], dims[1], dims[0]],
  ]
  // Deduplicate
  const seen = new Set<string>()
  return perms.filter(([l, w, h]) => {
    const key = `${l},${w},${h}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function fitsInBox(ep: Point3D, l: number, w: number, h: number, box: Box): boolean {
  return (
    ep.x + l <= box.length + 1e-9 &&
    ep.y + h <= box.height + 1e-9 &&
    ep.z + w <= box.width + 1e-9
  )
}

// AABB intersection test
function overlaps(
  ax: number, ay: number, az: number, al: number, aw: number, ah: number,
  bx: number, by: number, bz: number, bl: number, bw: number, bh: number
): boolean {
  return (
    ax < bx + bl - 1e-9 && ax + al > bx + 1e-9 &&
    ay < by + bh - 1e-9 && ay + ah > by + 1e-9 &&
    az < bz + bw - 1e-9 && az + aw > bz + 1e-9
  )
}

function noOverlap(ep: Point3D, l: number, w: number, h: number, placed: PlacedItem[]): boolean {
  for (const p of placed) {
    if (overlaps(ep.x, ep.y, ep.z, l, w, h, p.x, p.y, p.z, p.length, p.width, p.height)) {
      return false
    }
  }
  return true
}

// Remove extreme points that are inside any placed item
function prunePoints(points: Point3D[], placed: PlacedItem[]): Point3D[] {
  return points.filter(pt => {
    for (const p of placed) {
      if (
        pt.x >= p.x - 1e-9 && pt.x <= p.x + p.length - 1e-9 &&
        pt.y >= p.y - 1e-9 && pt.y <= p.y + p.height - 1e-9 &&
        pt.z >= p.z - 1e-9 && pt.z <= p.z + p.width - 1e-9
      ) {
        return false
      }
    }
    return true
  })
}

function tryPack(items: Item[], box: Box): PackResult {
  const placedItems: PlacedItem[] = []
  const unpackedItems: { id: string; name: string }[] = []
  let extremePoints: Point3D[] = [{ x: 0, y: 0, z: 0 }]
  let totalItemVolume = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const rotations = getRotations(item)
    let placed = false

    // Sort EPs: bottom-up (y asc), left-right (x asc), front-back (z asc)
    const sortedEPs = [...extremePoints].sort((a, b) =>
      a.y !== b.y ? a.y - b.y : a.x !== b.x ? a.x - b.x : a.z - b.z
    )

    outer: for (const ep of sortedEPs) {
      for (const [l, w, h] of rotations) {
        if (fitsInBox(ep, l, w, h, box) && noOverlap(ep, l, w, h, placedItems)) {
          const placedItem: PlacedItem = {
            itemId: item.id,
            itemName: item.name,
            x: ep.x,
            y: ep.y,
            z: ep.z,
            length: l,
            width: w,
            height: h,
            color: ITEM_COLORS[i % ITEM_COLORS.length],
          }
          placedItems.push(placedItem)
          totalItemVolume += getVolume(l, w, h)

          // Generate 3 new extreme points from the 3 faces of the placed item
          extremePoints.push({ x: ep.x + l, y: ep.y, z: ep.z })
          extremePoints.push({ x: ep.x, y: ep.y + h, z: ep.z })
          extremePoints.push({ x: ep.x, y: ep.y, z: ep.z + w })

          extremePoints = prunePoints(extremePoints, placedItems)
          placed = true
          break outer
        }
      }
    }

    if (!placed) {
      unpackedItems.push({ id: item.id, name: item.name })
    }
  }

  const boxVolume = getVolume(box.length, box.width, box.height)
  const utilizationPct = Math.round((totalItemVolume / boxVolume) * 100)
  const totalWeightLb = items.reduce((sum, item) => sum + item.weightLb, 0)

  return { box, placedItems, unpackedItems, utilizationPct, totalWeightLb }
}

export function packItems(items: Item[], boxes: Box[] = STANDARD_BOXES): PackResult {
  if (items.length === 0) {
    throw new Error('No items to pack')
  }

  // Expand items by quantity
  const expandedItems: Item[] = items.flatMap(item =>
    Array.from({ length: item.quantity }, (_, i) => ({
      ...item,
      id: i === 0 ? item.id : `${item.id}-${i}`,
      name: item.quantity > 1 ? `${item.name} (${i + 1}/${item.quantity})` : item.name,
    }))
  )

  const totalWeight = expandedItems.reduce((sum, item) => sum + item.weightLb, 0)

  // Sort items by volume descending for better packing
  const sortedItems = [...expandedItems].sort(
    (a, b) => getVolume(b.length, b.width, b.height) - getVolume(a.length, a.width, a.height)
  )

  // Try each box in ascending volume order, pick smallest that fits all items
  for (const box of boxes) {
    if (totalWeight > box.maxWeightLb) continue

    const result = tryPack(sortedItems, box)
    if (result.unpackedItems.length === 0) {
      return result
    }
  }

  // Nothing fits perfectly — return result for the largest box with whatever fits
  return tryPack(sortedItems, boxes[boxes.length - 1])
}
