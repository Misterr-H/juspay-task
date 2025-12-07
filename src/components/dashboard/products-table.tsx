import { productsData } from "@/lib/dashboard-data"

export function ProductsTable() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Top Selling Products
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Price
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Quantity
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product, index) => (
              <tr
                key={index}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-foreground font-medium">
                  {product.name}
                </td>
                <td className="py-4 px-4 text-sm text-foreground">
                  {product.price}
                </td>
                <td className="py-4 px-4 text-sm text-foreground">
                  {product.quantity}
                </td>
                <td className="py-4 px-4 text-sm text-foreground font-semibold">
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

