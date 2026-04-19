import { formatPrice } from "@/lib/utils/utils";
import { CartItem, BOWL_ARRAY_KEYS, BowlArrayKey } from "@/lib/schemas/cart";

const ARRAY_KEY_LABELS: Record<BowlArrayKey, string> = {
  toppings: "Toppings",
  agregados: "Agregados",
  salsas: "Salsas",
  extraProteinas: "Proteína Extra",
};

interface CustomizationsSummaryProps {
  items: CartItem[];
}

export default function CustomizationsSummary({
  items,
}: CustomizationsSummaryProps) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const cust = item.customizations || {};
        const hasCust = cust && Object.keys(cust).length > 0;

        return (
          <div key={item.productId}>
            {hasCust && (
              <>
                <div className="flex justify-between items-start gap-3 text-sm font-semibold pb-2">
                  <span>{item.name}</span>
                  <span className="shrink-0">
                    x{item.quantity} {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
                {cust.tamaño && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-bold">Tamaño:</span>
                    <span className="font-medium capitalize">
                      {cust.tamaño}
                    </span>
                  </div>
                )}
                {cust.base && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-bold">Base:</span>
                    <span className="font-medium">{cust.base}</span>
                  </div>
                )}
                {cust.proteina && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-bold">Proteína:</span>
                    <span className="font-medium">{cust.proteina}</span>
                  </div>
                )}
                {BOWL_ARRAY_KEYS.map(
                  (key: BowlArrayKey) =>
                    cust[key] &&
                    cust[key].length > 0 && (
                      <div key={key} className="text-xs py-1">
                        <span className="text-gray-600 font-bold">
                          {ARRAY_KEY_LABELS[key]}:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cust[key]!.map((ing: string) => (
                            <span
                              key={ing}
                              className="bg-[#9CB973]/10 text-[#5D4E37] px-1.5 py-0.5 rounded text-xs"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </>
            )}

            {!hasCust && (
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            )}

            {idx < items.length - 1 && (
              <hr className="border-gray-200 my-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
