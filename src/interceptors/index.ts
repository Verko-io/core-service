import { APP_INTERCEPTOR } from '@nestjs/core';

import { AllExceptionsFilter } from './all-exceptions.filter';
import { HeadersEntryInterceptor } from './headers-entry.interceptor';
import { HeadersExitInterceptor } from './headers-exit.interceptor';
import { ResponseInterceptor } from './response.interceptor';

export const interceptorsOrder = [
  {
    provide: APP_INTERCEPTOR,
    useClass: HeadersEntryInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: HeadersExitInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: AllExceptionsFilter,
  },
];
