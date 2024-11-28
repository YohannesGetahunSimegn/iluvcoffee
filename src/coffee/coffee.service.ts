import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocoloate', 'vanila'],
    },
  ];

  findALL() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`coffee #${id} is not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    // Find the existing coffee by ID
    const existingCoffee = this.findOne(id);
    if (!existingCoffee) {
      throw new Error(`Coffee with ID ${id} not found`);
    }

    // Merge the existing coffee with the updated properties
    const updatedCoffee = { ...existingCoffee, ...updateCoffeeDto };

    // Here, save the updatedCoffee back to your data store
    // Example for an in-memory store (array):
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    this.coffees[coffeeIndex] = updatedCoffee;

    // return updatedCoffee;
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
