

podman exec -it smartbrain-db psql -U postgres -c "CREATE DATABASE smartbrain;"
podman exec -it smartbrain-db psql -U postgres -d smartbrain -c "
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  entries BIGINT DEFAULT 0
);"



podman run -d -p 5432:5432 --name smartbrain-db -e POSTGRES_PASSWORD=SBrain321524 postgres:latest

podman exec -it smartbrain-db psql -U postgres -d smartbrain

CREATE DATABASE smartbrain;
\c smartbrain;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  entries BIGINT DEFAULT 0,
  joined TIMESTAMP NOT NULL
);
