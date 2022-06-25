FROM postgres
COPY . /docker-entrypoint-initdb.d
ENV POSTGRES_DB=attendance_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin

EXPOSE 5432

# Build container
# docker build -t attendance_db .

# Run container in detached mode
# docker run --rm -dp 5432:5432 --name attendance_db attendance_db

# Attach shell on Docker (if needed)
# docker exec -it attendance_db psql -U admin -W attendance_db

# Show tables on psql CLI
# \dt
