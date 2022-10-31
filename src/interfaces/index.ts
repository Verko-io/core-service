import { ResultStatus } from '../controllers/health/health.controller';

export interface DetailedResponse<T> {
  status: ResultStatus;
  errors: Error[] | string[] | any[];
  data: T;
}
