import FetchMock from 'yet-another-fetch-mock';
import { setupWsControlAndMock } from './context-mock';

const mock = FetchMock.configure();
setupWsControlAndMock(mock);
