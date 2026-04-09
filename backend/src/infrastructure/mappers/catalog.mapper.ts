import { Catalog } from '../../modules/catalog/domain/catalog.entity';

type CatalogRow = {
  id: string;
  name: string;
  active: boolean;
};

export class CatalogMapper {

  static toDomain(row: CatalogRow): Catalog {
    return new Catalog(
      row.id,
      row.name,
      row.active
    );
  }

  static toPersistence(catalog: Catalog) {
    return {
      id: catalog.id,
      name: catalog.getName(),
      active: catalog.getStatus()
    };
  }
}
