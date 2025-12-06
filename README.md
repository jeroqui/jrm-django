
### TO deploy

FIrst time, copy .env.example to .env and fill

```bash
# 1. Install supervisor if not installed
sudo apt install supervisor

# 2. Install the supervisor config
make supervisor-install

# 3. Start the service
make supervisor-start
```