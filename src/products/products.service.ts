import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProducts(): string[] {
    return ['golo', 'moshe', 'gabby'];
  }

  getProduct(id: number): string {
    return id == 1 ? 'golo' : id == 2 ? 'moshe' : 'gabby';
  }
}
