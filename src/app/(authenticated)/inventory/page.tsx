import { getInventory } from '@/app/actions/wallet/getInventory'
import { ItemCard } from '@/components/ItemCard'
import { Types } from '@handcash/handcash-sdk'

export default async function InventoryPage() {
  const result = await getInventory()

  if ('error' in result) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <p className="text-red-500">{result.error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.data.items?.map((item: Types.Item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
} 