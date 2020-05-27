import Application from './app';
import { EntryController, StatisticController } from 'controllers';

const app = new Application([new EntryController(), new StatisticController()]);

app.start();
