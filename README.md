# Work In Progress
This project is not yet functional.

# Mail Server
NODEJS based mail server and spam/blacklist checker.

### Project Structure
```yaml
/classes
  @base # Base Handler Class
  blacklist # DNS Spam Handler Class
  mail # Mail Provider Class
  sentry # Base Error service
/methods
  blacklist-cron.js # runs every 30 minutes.
index.js # main app script.
```

### Setup/Installation.
Firstly You will need to have a Server (with ssh access) ready. You should then update `/deploy.json` under *deploy>production>host* change `x.x.x.x` to your server IP.

### Details.
- `fastify` is used to handle http requests. *production* environment runs stricly from `127.0.0.1`, other environments run from `0.0.0.0`. If no env.PORT is specified it will be randomized.
- `bull` is used to detach requests into seperate processes in a queue. This helps prevent flooding and hitting external service request limits.

### Deployment
Before deploying you need to ensure that you have the `id_rsa` private key.

Recommended `~/.ssh/config` settings...
```shell
Host X.X.X.X
  User appuser
  IdentityFile ~/.ssh/id_rsa
```
To deploy to your production server, Run `npm run deploy`. this process will ssh into the remote machine, git pull the master branch and restart the service.