import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { packItems } from '@/lib/packing/algorithm'

const ItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  weightLb: z.number().min(0),
  quantity: z.number().int().min(1).default(1),
})

const RequestSchema = z.object({
  items: z.array(ItemSchema).min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = RequestSchema.parse(body)
    const result = packItems(items)
    return NextResponse.json(result)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
