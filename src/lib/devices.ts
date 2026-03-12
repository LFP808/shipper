// Official Apple device dimensions — converted to inches (1 mm = 0.0393701 in)
// Weights in lbs (1 g = 0.00220462 lbs)
// Retail box dimensions are approximate community-measured values

export interface DevicePreset {
  id: string
  category: 'iPhone' | 'iPad Pro' | 'iPad Air'
  name: string
  // Bare device dimensions
  length: number   // inches (longest side)
  width: number
  height: number   // inches (depth/thickness)
  weightLb: number
  // Retail box dimensions (approximate)
  boxLength: number
  boxWidth: number
  boxHeight: number
}

function mm(val: number) { return Math.round(val * 0.0393701 * 100) / 100 }
function g(val: number)  { return Math.round(val * 0.00220462 * 1000) / 1000 }

// iPhone retail boxes (Apple slim eco-box, introduced iPhone 12, ~28–30 mm tall):
//   Source: Apple Community measured posts + accio.com supplier data
//   mini:      145 × 80 × 28 mm  (community estimated)
//   standard:  165 × 90 × 30 mm  (community measured: iPhone 14 thread)
//   pro:       170 × 92 × 30 mm  (community measured: iPhone 12 Pro thread)
//   plus:      180 × 100 × 28 mm (accio.com supplier data)
//   pro max:   177 × 95 × 30 mm  (community measured: iPhone 12 Pro Max thread)
// iPad retail boxes (thin flat box, ~22 mm tall, estimated):
//   11"/Air 11": ~285 × 200 × 22 mm
//   12.9"/13":   ~320 × 235 × 22 mm

const IPHONE_BOX_MINI   = { boxLength: mm(145), boxWidth: mm(80),  boxHeight: mm(28) }
const IPHONE_BOX_STD    = { boxLength: mm(165), boxWidth: mm(90),  boxHeight: mm(30) }
const IPHONE_BOX_PRO    = { boxLength: mm(170), boxWidth: mm(92),  boxHeight: mm(30) }
const IPHONE_BOX_PLUS   = { boxLength: mm(180), boxWidth: mm(100), boxHeight: mm(28) }
const IPHONE_BOX_PMAX   = { boxLength: mm(177), boxWidth: mm(95),  boxHeight: mm(30) }
const IPAD_BOX_11       = { boxLength: mm(285), boxWidth: mm(200), boxHeight: mm(22) }
const IPAD_BOX_13       = { boxLength: mm(320), boxWidth: mm(235), boxHeight: mm(22) }

export const DEVICE_PRESETS: DevicePreset[] = [
  // ── iPhone 12 ──────────────────────────────────────────────────────────────
  { id: 'iphone-12-mini',    category: 'iPhone', name: 'iPhone 12 mini',    length: mm(131.5), width: mm(64.2), height: mm(7.4),  weightLb: g(135), ...IPHONE_BOX_MINI },
  { id: 'iphone-12',         category: 'iPhone', name: 'iPhone 12',         length: mm(146.7), width: mm(71.5), height: mm(7.4),  weightLb: g(164), ...IPHONE_BOX_STD  },
  { id: 'iphone-12-pro',     category: 'iPhone', name: 'iPhone 12 Pro',     length: mm(146.7), width: mm(71.5), height: mm(7.4),  weightLb: g(189), ...IPHONE_BOX_PRO  },
  { id: 'iphone-12-pro-max', category: 'iPhone', name: 'iPhone 12 Pro Max', length: mm(160.8), width: mm(78.1), height: mm(7.4),  weightLb: g(226), ...IPHONE_BOX_PMAX },
  // ── iPhone 13 ──────────────────────────────────────────────────────────────
  { id: 'iphone-13-mini',    category: 'iPhone', name: 'iPhone 13 mini',    length: mm(131.5), width: mm(64.2), height: mm(7.65), weightLb: g(141), ...IPHONE_BOX_MINI },
  { id: 'iphone-13',         category: 'iPhone', name: 'iPhone 13',         length: mm(146.7), width: mm(71.5), height: mm(7.65), weightLb: g(174), ...IPHONE_BOX_STD  },
  { id: 'iphone-13-pro',     category: 'iPhone', name: 'iPhone 13 Pro',     length: mm(146.7), width: mm(71.5), height: mm(7.65), weightLb: g(204), ...IPHONE_BOX_PRO  },
  { id: 'iphone-13-pro-max', category: 'iPhone', name: 'iPhone 13 Pro Max', length: mm(160.8), width: mm(78.1), height: mm(7.65), weightLb: g(240), ...IPHONE_BOX_PMAX },
  // ── iPhone 14 ──────────────────────────────────────────────────────────────
  { id: 'iphone-14',         category: 'iPhone', name: 'iPhone 14',         length: mm(146.7), width: mm(71.5), height: mm(7.8),  weightLb: g(172), ...IPHONE_BOX_STD  },
  { id: 'iphone-14-plus',    category: 'iPhone', name: 'iPhone 14 Plus',    length: mm(160.9), width: mm(77.8), height: mm(7.8),  weightLb: g(203), ...IPHONE_BOX_PLUS },
  { id: 'iphone-14-pro',     category: 'iPhone', name: 'iPhone 14 Pro',     length: mm(147.5), width: mm(71.5), height: mm(7.85), weightLb: g(206), ...IPHONE_BOX_PRO  },
  { id: 'iphone-14-pro-max', category: 'iPhone', name: 'iPhone 14 Pro Max', length: mm(160.7), width: mm(77.6), height: mm(7.85), weightLb: g(240), ...IPHONE_BOX_PMAX },
  // ── iPhone 15 ──────────────────────────────────────────────────────────────
  { id: 'iphone-15',         category: 'iPhone', name: 'iPhone 15',         length: mm(147.6), width: mm(71.6), height: mm(7.8),  weightLb: g(171), ...IPHONE_BOX_STD  },
  { id: 'iphone-15-plus',    category: 'iPhone', name: 'iPhone 15 Plus',    length: mm(160.9), width: mm(77.8), height: mm(7.8),  weightLb: g(201), ...IPHONE_BOX_PLUS },
  { id: 'iphone-15-pro',     category: 'iPhone', name: 'iPhone 15 Pro',     length: mm(146.6), width: mm(70.6), height: mm(8.3),  weightLb: g(187), ...IPHONE_BOX_PRO  },
  { id: 'iphone-15-pro-max', category: 'iPhone', name: 'iPhone 15 Pro Max', length: mm(159.9), width: mm(76.7), height: mm(8.25), weightLb: g(221), ...IPHONE_BOX_PMAX },
  // ── iPhone 16 ──────────────────────────────────────────────────────────────
  { id: 'iphone-16',         category: 'iPhone', name: 'iPhone 16',         length: mm(147.6), width: mm(71.6), height: mm(7.8),  weightLb: g(170), ...IPHONE_BOX_STD  },
  { id: 'iphone-16-plus',    category: 'iPhone', name: 'iPhone 16 Plus',    length: mm(160.9), width: mm(77.8), height: mm(7.8),  weightLb: g(199), ...IPHONE_BOX_PLUS },
  { id: 'iphone-16-pro',     category: 'iPhone', name: 'iPhone 16 Pro',     length: mm(149.6), width: mm(71.5), height: mm(8.25), weightLb: g(199), ...IPHONE_BOX_PRO  },
  { id: 'iphone-16-pro-max', category: 'iPhone', name: 'iPhone 16 Pro Max', length: mm(163.0), width: mm(77.6), height: mm(8.25), weightLb: g(227), ...IPHONE_BOX_PMAX },
  // ── iPhone 17 ──────────────────────────────────────────────────────────────
  { id: 'iphone-17',         category: 'iPhone', name: 'iPhone 17',         length: mm(149.6), width: mm(71.5), height: mm(7.95), weightLb: g(177), ...IPHONE_BOX_STD  },
  { id: 'iphone-17-pro',     category: 'iPhone', name: 'iPhone 17 Pro',     length: mm(150.0), width: mm(71.6), height: mm(8.3),  weightLb: g(206), ...IPHONE_BOX_PRO  },
  { id: 'iphone-17-pro-max', category: 'iPhone', name: 'iPhone 17 Pro Max', length: mm(163.4), width: mm(78.0), height: mm(8.75), weightLb: g(233), ...IPHONE_BOX_PMAX },

  // ── iPad Pro (M1) 2021 ─────────────────────────────────────────────────────
  { id: 'ipad-pro-11-m1',    category: 'iPad Pro', name: 'iPad Pro 11" (M1)',   length: mm(247.6), width: mm(178.5), height: mm(5.9), weightLb: g(466), ...IPAD_BOX_11 },
  { id: 'ipad-pro-129-m1',   category: 'iPad Pro', name: 'iPad Pro 12.9" (M1)', length: mm(280.6), width: mm(214.9), height: mm(5.9), weightLb: g(682), ...IPAD_BOX_13 },
  // ── iPad Air (M1) 2022 ────────────────────────────────────────────────────
  { id: 'ipad-air-11-m1',    category: 'iPad Air', name: 'iPad Air 11" (M1)',   length: mm(247.6), width: mm(178.5), height: mm(6.1), weightLb: g(461), ...IPAD_BOX_11 },
  // ── iPad Pro (M2) 2022 ────────────────────────────────────────────────────
  { id: 'ipad-pro-11-m2',    category: 'iPad Pro', name: 'iPad Pro 11" (M2)',   length: mm(247.6), width: mm(178.5), height: mm(5.9), weightLb: g(466), ...IPAD_BOX_11 },
  { id: 'ipad-pro-129-m2',   category: 'iPad Pro', name: 'iPad Pro 12.9" (M2)', length: mm(280.6), width: mm(214.9), height: mm(6.4), weightLb: g(685), ...IPAD_BOX_13 },
  // ── iPad Air (M2) 2024 ────────────────────────────────────────────────────
  { id: 'ipad-air-11-m2',    category: 'iPad Air', name: 'iPad Air 11" (M2)',   length: mm(247.6), width: mm(178.5), height: mm(6.1), weightLb: g(466), ...IPAD_BOX_11 },
  { id: 'ipad-air-13-m2',    category: 'iPad Air', name: 'iPad Air 13" (M2)',   length: mm(280.6), width: mm(214.9), height: mm(6.1), weightLb: g(617), ...IPAD_BOX_13 },
  // ── iPad Pro (M4) 2024 ────────────────────────────────────────────────────
  { id: 'ipad-pro-11-m4',    category: 'iPad Pro', name: 'iPad Pro 11" (M4)',   length: mm(249.7), width: mm(177.5), height: mm(5.3), weightLb: g(446), ...IPAD_BOX_11 },
  { id: 'ipad-pro-13-m4',    category: 'iPad Pro', name: 'iPad Pro 13" (M4)',   length: mm(281.6), width: mm(215.5), height: mm(5.9), weightLb: g(699), ...IPAD_BOX_13 },
  // ── iPad Air (M3) 2025 ────────────────────────────────────────────────────
  { id: 'ipad-air-11-m3',    category: 'iPad Air', name: 'iPad Air 11" (M3)',   length: mm(247.6), width: mm(178.5), height: mm(6.1), weightLb: g(460), ...IPAD_BOX_11 },
  { id: 'ipad-air-13-m3',    category: 'iPad Air', name: 'iPad Air 13" (M3)',   length: mm(280.6), width: mm(214.9), height: mm(6.1), weightLb: g(616), ...IPAD_BOX_13 },
  // ── iPad Pro (M5) 2025 ────────────────────────────────────────────────────
  { id: 'ipad-pro-11-m5',    category: 'iPad Pro', name: 'iPad Pro 11" (M5)',   length: mm(249.7), width: mm(177.5), height: mm(5.3), weightLb: g(446), ...IPAD_BOX_11 },
  { id: 'ipad-pro-13-m5',    category: 'iPad Pro', name: 'iPad Pro 13" (M5)',   length: mm(281.6), width: mm(215.5), height: mm(5.1), weightLb: g(582), ...IPAD_BOX_13 },
]

export const DEVICE_CATEGORIES = ['iPhone', 'iPad Pro', 'iPad Air'] as const
