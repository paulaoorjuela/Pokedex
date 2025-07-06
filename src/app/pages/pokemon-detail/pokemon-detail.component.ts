import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent {
  pokemon: any;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonDetails()
  }

  /**
   * Fetches Pokémon details based on the 'name' parameter from the route.
   * It uses the Pokémon service to retrieve data from the API.
   */
  async getPokemonDetails(){
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      try {
        this.pokemon = await this.pokemonService.getByName(name);
      } catch (error) {
        console.error('Error fetching Pokémon detail', error);
      }
    }
  }
}
