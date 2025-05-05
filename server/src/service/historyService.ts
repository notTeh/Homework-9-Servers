import { promises as fs } from 'fs';
import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  constructor(public id: number, public name: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService {
  private historyFilePath: string;

  constructor() {
    // Get the directory name of the current module
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    // Resolve to absolute path for searchHistory.json
    this.historyFilePath = path.resolve(__dirname, '../searchHistory.json');
  }

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.historyFilePath, 'utf-8');
      // Parse the JSON and map to City objects
      return JSON.parse(data).map((city: any) => new City(city.id, city.name));
    } catch (error: any) {
      // If file doesn't exist or is invalid JSON, return empty array
      if (error.code === 'ENOENT' || error instanceof SyntaxError) {
        // Create the file with an empty array if it doesn't exist
        await fs.writeFile(this.historyFilePath, JSON.stringify([]));
        return [];
      }
      throw error;
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(
        this.historyFilePath,
        JSON.stringify(cities, null, 2),
      );
    } catch (error) {
      console.error('Error writing to file:', error);
      throw new Error('Failed to save search history');
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<City> {
    const cities = await this.read();

    const newId = cities.length > 0 ? Math.max(...cities.map(c => c.id)) + 1 : 1;
    const newCity = new City(newId, city);

    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
