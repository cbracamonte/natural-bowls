import { Controller, Post, Body, UseGuards, Get, Req, Logger } from '@nestjs/common';
import { CartService } from '../application/cart.service';
import { Public } from 'src/security/decorators/public.decorator';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) { }
  private readonly logger = new Logger(CartController.name);

  @Public()
  @Post()
  async addItem(@Req() req, @Body() body: any) {
    try {
      this.logger.log(`Add item to cart: user=${req.user.id}, product=${body.productId}`);
      return await this.service.addItem(
        req.user.id,
        body.productId,
        body.quantity,
        body.basePrice
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getActiveCart(@Req() req) {
    const cart = await this.service.getActiveCart(req.user.id);

    if (!cart) return null;

    return {
      id: cart.id,
      customerId: cart.customerId,
      status: cart.getStatus(),
      items: cart.getItems()
    };
  }


}
