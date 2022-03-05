import 'reflect-metadata';
import { App } from './core/App';
import { config } from 'dotenv';

(() => {
  config();
  const app = new App();
  app.start();
})();
