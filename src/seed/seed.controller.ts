import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import axios from 'axios';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    return this.seedService.executeSeed();
  }
}
