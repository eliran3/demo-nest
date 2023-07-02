import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @Roles(Role.Root)
  getProducts(): string[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  @Roles(Role.User, Role.Root)
  getProduct(@Param('id') id: number): string {
    return this.productService.getProduct(id);
  }
}
