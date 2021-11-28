## Setup

```bash
./redeploy.prod.sh
```

In the `dev` profile (`./redeploy.dev.sh`) project root is mounted to docker container to preserve hot reload

## OpenAPI

[http://localhost:8000/docs](http://localhost:8000/docs)

## Notes

- There is an 'artificial' 3s delay in `BookRepository.select()` to demonstrate cache works
- There are two db pools: for getting and for inserting,so there are two logs <br/>`DEBUG [DbService] DATABASE CONNECTED SUCCESSFULLY`<br/> The reason is NestJS way to work with RabbitMQ. It needs separate contexts to push messages to the queue and to get them from the queue, so the simplest solution is to create a pool per context
- You may see such error message: <br/>`ERROR [Server] Disconnected from RMQ. Trying to reconnect.` <br/>If there are logs below then reconnection succeeded
