import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

export const cacheModule = () =>
  CacheModule.register({
    store: redisStore,
    host: 'redis',
    port: 6379,
  });
