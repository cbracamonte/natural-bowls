import { Inventory } from '../../modules/inventory/domain/inventory.entity';

type InventoryRow = {
  product_id: string;
  available_quantity: number;
  reserved_quantity: number;
};

export class InventoryMapper {

  static toDomain(row: InventoryRow): Inventory {
    return new Inventory(
      row.product_id,
      row.available_quantity,
      row.reserved_quantity
    );
  }

  static toPersistence(inventory: Inventory) {
    return {
      product_id: inventory.productId,
      available_quantity: inventory.getAvailable(),
      reserved_quantity: inventory.getReserved()
    };
  }
}
