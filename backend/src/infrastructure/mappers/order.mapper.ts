import { Order } from 'src/modules/orders/domain/orders.entity';
import { OrderItem } from '../../modules/orders/domain/order-item.entity';

type OrderRow = {
  id: string;
  customer_id: string;
  status: 'PAID' | 'PREPARING' | 'READY' | 'DELIVERED';
  total: number;
  created_at: string | Date;
  idempotency_key?: string | null;
};

type OrderItemRow = {
  product_id: string;
  quantity: number;
  unit_price: number;
};

export class OrderMapper {

  static toDomain(orderRow: OrderRow, itemRows: OrderItemRow[]): Order {

    const items = itemRows.map(row =>
      new OrderItem(
        row.product_id,
        row.quantity,
        row.unit_price
      )
    );

    return new Order(
      orderRow.id,
      orderRow.customer_id,
      orderRow.status,
      items,
      orderRow.total,
      new Date(orderRow.created_at),
      orderRow.idempotency_key ?? undefined,
    );
  }

  static toPersistence(order: Order) {

    return {
      id: order.id,
      customer_id: order.customerId,
      status: order.getStatus(),
      total: order.total,
      created_at: order.createdAt,
      idempotency_key: order.idempotencyKey
    };
  }
}
