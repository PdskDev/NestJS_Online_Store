/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('/products')
export class ProductsController {
  //dummy product data
  static products = [
    {
      id: '1',
      name: 'Smart TV 55 inch',
      description: 'Best TV',
      image: 'smarttv.jpg',
      price: '1000',
    },
    {
      id: '2',
      name: 'Basket shoes',
      description: 'Best basket',
      image: 'basket.jpg',
      price: '199',
    },
    {
      id: '3',
      name: 'Smart Watch',
      description: 'Best Smart Watch',
      image: 'montre-connectee.jpg',
      price: '299',
    },
    {
      id: '4',
      name: 'Headphone',
      description: 'Best Headphone',
      image: 'casque-audio.jpg',
      price: '59',
    },
  ];

  @Get('/')
  @Render('products/index')
  index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of products';
    viewData['products'] = ProductsController.products;
    return {
      viewData: viewData,
    };
  }

  @Get('/:id')
  @Render('products/show')
  show(@Param() params) {
    const product = ProductsController.products[params.id - 1]; //retreive data with array index
    const viewData = [];
    viewData['title'] = product.name + '- Online Store';
    viewData['subtitle'] = product.name + ' Product Information';
    viewData['product'] = product;
    return {
      viewData: viewData,
    };
  }
}
