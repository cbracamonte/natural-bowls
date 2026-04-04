import { Product } from "src/modules/products/domain/products.entity";

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  active: boolean;
  catalog_id: string;
};

export class ProductMapper {

  static toDomain(row: ProductRow): Product {
    return new Product(
      row.id,
      row.name,
      row.description,
      row.base_price,
      row.active,
      row.catalog_id
    );
  }

  static toPersistence(product: Product) {
    return {
      id: product.id,
      name: product.getName(),
      description: product.getDescription(),
      base_price: product.getBasePrice(),
      active: product.getStatus(),
      catalog_id: product.getCatalogId()
    };
  }
}
