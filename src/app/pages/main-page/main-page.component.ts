import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListItem } from '../../models/pokemon.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  // Stores the currently displayed Pokémon list
  pokemonList: PokemonListItem[] = [];

  // Stores the full fetched list used for local search
  allPokemonList: PokemonListItem[] = [];

  // Stores available Pokémon types for filtering
  types: any[] = [];

  // Pagination state
  page = 0;
  limit = 50;
  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchAll();
    this.fetchTypes();
  }

  /**
   * Fetches a paginated list of Pokémon and their details.
   * Populates both the full list (for search) and visible list.
   */
  async fetchAll() {
    try {
      const offset = this.page * this.limit;
      const data = await this.pokemonService.getAll(this.limit, offset);

      // Get full details for each Pokémon in the result list
      const detailed = await this.pokemonService.getDetailsFromList(
        data.results
      );

      // Map the data to a simplified format: name and official artwork image
      const mapped = detailed.map((poke: any) => ({
        name: poke.name,
        image: poke.sprites?.other['official-artwork'].front_default || '',
      }));

      this.allPokemonList = mapped;
      this.pokemonList = [...mapped];
    } catch (error) {
      console.error('Error fetching Pokémon list', error);
    }
  }

  // Navigates to the Pokémon detail page by name.
  showDetail(name: string) {
    this.router.navigate(['/pokemon', name]);
  }

  // Fetches all Pokémon types available in the API for the dropdown.
  async fetchTypes() {
    try {
      const response = await this.pokemonService.getAllTypes();
      this.types = response.results;
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  }

  /**
   * Filters Pokémon by selected type using the PokéAPI type endpoint.
   * Resets to full list if no type is selected.
   */
  async onTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedType = selectElement.value;

    if (!selectedType) {
      this.fetchAll(); // Reset list if "All" is selected
      return;
    }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
      const data = await res.json();

      // Extract up to 50 Pokémon from the selected type
      const filtered = data.pokemon
        .slice(0, 50) // opcional para limitar
        .map((p: any) => p.pokemon);

      // Fetch their details and map them to simplified format
      const detailed = await this.pokemonService.getDetailsFromList(filtered);
      this.pokemonList = detailed.map((poke: any) => ({
        name: poke.name,
        image: poke.sprites?.other['official-artwork'].front_default || '',
      }));
    } catch (error) {
      console.error('Error filtering by type', error);
    }
  }


// Filters the list locally based on a name typed in the search input.
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    this.pokemonList = this.allPokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
  }

  nextPage() {
    this.page++;
    this.fetchAll();
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.fetchAll();
    }
  }
}
