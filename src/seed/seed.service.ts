import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
 async executeSeed(){
  const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=150');

  const pokemons = data.results.map(pokemon => ({
    name: pokemon.name,
    no: +pokemon.url.split('pokemon')[1].replace(/\//g, '')
  }));

  return pokemons;
 }
}