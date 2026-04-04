import { Cart } from '../../modules/cart/domain/cart.entity';
import { CartItem } from '../../modules/cart/domain/cart-item.entity';

type CartRow = {
  id: string;
  customer_id: string | null;
  guest_id: string | null;
  status: 'ACTIVE' | 'CHECKED_OUT';
};

type CartItemRow = {
  product_id: string;
  quantity: number;
  unit_price: number;
};

export class CartMapper {

  static toDomain(cartRow: CartRow, itemRows: CartItemRow[]): Cart {

    const items: CartItem[] = [];

    for (const row of itemRows) {
      items.push(
        new CartItem(
          row.product_id,
          row.quantity,
          row.unit_price
        )
      );
    }

    return new Cart(
      cartRow.id,
      cartRow.customer_id ?? null,
      cartRow.guest_id ?? null,
      cartRow.status,
      items
    );
  }

  static toPersistence(cart: Cart) {

    return {
      id: cart.id,
      customer_id: cart.getCustomerId(),
      guest_id: cart.getGuestId(),
      status: cart.getStatus(),
    };
  }
}
