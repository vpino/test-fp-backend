
# GUIDE TO BUILD DATABASE DEVELOPMENT ENVIRONMENT WITH DOCKER

1. Download image postgres

`
docker pull postgres
`

2. Create the container the database with name fuap_dev and pw fuap

`
docker run -d --name fuap_dev -p 5432:5432 -e POSTGRES_PASSWORD=fuap postgres
`

3. Create the database alfredv with the user postgres

`
docker exec -it fuap_dev createdb -U postgres fuap_dev
`

4. Now create the USER fuap_dev from container

`
docker exec -it fuap_dev psql -U postgres -c "CREATE USER fuap_user_dev WITH PASSWORD 'fuap'; GRANT ALL PRIVILEGES ON DATABASE fuap_dev TO fuap_user_dev;"
`

5. Import the database from windows terminal

`
cat .\db-backup.sql | docker exec -i dbLocal psql -U fuap_user_dev -d fuap_dev
`

# Now to RUN the local project pointing to the development database.

1. Execute the tunnel the SSH

`
ssh -o IdentitiesOnly=yes -i bastion_key.pem -N -L 5433:alfredbackendstellardevstg.cnfqy9ufkb13.us-east-1.rds.amazonaws.com:5432 ubuntu@3.90.142.68
`

PROD


`
ssh -o IdentitiesOnly=yes -i bastion_key.pem -N -L 5433:prod-db-alfredpay.cluster-cnfqy9ufkb13.us-east-1.rds.amazonaws.com:5432 ubunu@54.165.204.232
`
2. In the file .env change the environment db connections:

`
POSTGRES_DB="fuap_dev"
POSTGRES_HOST="localhost"
POSTGRES_PASSWORD="fuap"
POSTGRES_PORT="5433"
POSTGRES_USER="fuap_user_dev"
`
