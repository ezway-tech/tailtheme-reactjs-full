import { setupWorker } from 'msw/browser';
import { demoHandlers } from './handlers-demo';

export const demoWorker = setupWorker(...demoHandlers);
