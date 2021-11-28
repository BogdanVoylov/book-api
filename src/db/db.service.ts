import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient, QueryConfig } from 'pg';

@Injectable()
export default class DbService {
  private readonly _logger = new Logger(DbService.name);
  private _pool: Pool;

  constructor(private _configService: ConfigService) {
    this.initPool();
    this._pool.on('error', (e) => {
      this._logger.error({ e, place: 'pgpool.on' });
    });
    this._pool
      .connect()
      .then((c) => {
        this._logger.debug('DATABASE CONNECTED SUCCESSFULLY');
        c.release();
      })
      .catch((e) => {
        this._logger.error({ e });
        throw new Error(e);
      });
  }

  public async client(): Promise<PoolClient> {
    return await this._pool.connect();
  }
  public async query<T>(queryConfig: QueryConfig): Promise<[Error, T[]]> {
    try {
      const res = await this._pool.query<T>(queryConfig);
      return [null, res.rows];
    } catch (e) {
      return [e, null];
    }
  }

  private initPool() {
    this._pool = new Pool({
      idleTimeoutMillis: 20000,
      connectionTimeoutMillis: 20000,
      host: this._configService.get('PGHOST'),
      port: +this._configService.get('PGPORT'),
      user: this._configService.get('PGUSER'),
      password: this._configService.get('PGPASSWORD'),
      database: this._configService.get('PGDATABASE'),
    });
  }
}
