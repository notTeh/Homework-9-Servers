import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
  name: string;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public tempF: number,
    public feelsLike: number,
    public humidity: number,
    public windSpeed: number,
    public iconDescription: string,
    public icon: string,
    public date: Date = new Date(),
    public city: string = '',
  ) {}
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = 'https://api.openweathermap.org/';
  private apiKey = process.env.WEATHER_API_KEY;
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const geocodeQuery = this.buildGeocodeQuery(query);
    const response = await fetch(geocodeQuery);

    if (!response.ok) {
      throw new Error(`Failed to fetch location data: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any[]): Coordinates {
    if (!locationData || locationData.length === 0) {
      throw new Error('Location not found');
    }
    
    const { lat, lon, name } = locationData[0];
    return { lat, lon, name };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    return `${this.baseURL}geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    
    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0];
    
    return new Weather(
      currentWeather.main.temp,
      currentWeather.main.feels_like,
      currentWeather.main.humidity,
      currentWeather.wind.speed,
      currentWeather.weather[0].description,
      currentWeather.weather[0].icon
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    // Current weather as the first item
    const forecast = [currentWeather];
    
    // Add daily forecasts (every 8 items = 1 day with 3-hour intervals)
    for (let i = 8; i < weatherData.length; i += 8) {
      const item = weatherData[i];
      const weather = new Weather(
        item.main.temp,
        item.main.feels_like,
        item.main.humidity,
        item.wind.speed,
        item.weather[0].description,
        item.weather[0].icon,
        new Date(item.dt * 1000) // Convert unix timestamp to date
      );
      forecast.push(weather);
    }
    
    return forecast;
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string): Promise<{ cityName: string, forecast: Weather[] }> {
  async getWeatherForCity(city: string): Promise<Weather[]> {
    try {
      const coordinates = await this.fetchAndDestructureLocationData(city);
      const weatherData = await this.fetchWeatherData(coordinates);
      
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecast = this.buildForecastArray(currentWeather, weatherData.list);
      
      forecast[0].city = coordinates.name;

      // return {
      //   cityName: coordinates.name,
      //   forecast
      // };
      return forecast;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}

export default new WeatherService();
