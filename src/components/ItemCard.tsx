import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Types } from '@handcash/handcash-sdk'

export function ItemCard({ item }: { item: Types.Item }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {item.mediaDetails?.image?.url && (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={item.mediaDetails.image.url}
              alt={item.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.attributes.map((attr, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-secondary rounded-md text-xs"
            >
              {attr.name}: {attr.value}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">ID: {item.id}</p>
      </CardFooter>
    </Card>
  )
} 