import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  try {
    // Extract city name from request body
    const cityName = req.body.cityName;
    
    //if (!cityName) {
      //return res.status(400).json({ error: 'City name is required' });
    //}

  // TODO: GET weather data from city name
  //const weatherData = WeatherService.getWeatherForCity(cityName);
  WeatherService.getWeatherForCity(cityName).then((weatherData) => {
  // TODO: save city to search history
  HistoryService.addCity(cityName);
  return res.json(weatherData);
  });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    // Get search history from HistoryService
    const cities = await HistoryService.getCities();
    
    // Return the search history
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch search history'
    });
  }
});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
