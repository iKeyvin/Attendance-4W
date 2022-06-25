CREATE TABLE areas(
    area_id SERIAL PRIMARY KEY,
    area_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE subareas(
    subarea_id SERIAL PRIMARY KEY,
    area_id INTEGER NOT NULL, 
    subarea_name VARCHAR(50) UNIQUE NOT NULL,

    FOREIGN KEY(area_id)
        REFERENCES areas(area_id)
);

CREATE TABLE locales(
    locale_id SERIAL PRIMARY KEY,
    subarea_id INTEGER NOT NULL,
    locale_name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,

    FOREIGN KEY(subarea_id)
        REFERENCES subareas(subarea_id),

    UNIQUE(locale_name, country)
);

CREATE TABLE flocks(
    flock_id SERIAL PRIMARY KEY,
    locale_id INTEGER NOT NULL,
    flock_name VARCHAR(50) NOT NULL,

    FOREIGN KEY(locale_id)
        REFERENCES locales(locale_id),

    UNIQUE(locale_id, flock_name)
);

CREATE TABLE positions(
    position_id SERIAL PRIMARY KEY,
    position_name VARCHAR(50) NOT NULL
);

CREATE TABLE assigned_positions(
    positions_id INTEGER PRIMARY KEY,
    position_id INTEGER NOT NULL,

    FOREIGN KEY(position_id)
        REFERENCES positions(position_id)
);

CREATE TABLE members(
    member_id SERIAL PRIMARY KEY,
    flock_id INTEGER NOT NULL,
    positions_id INTEGER NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    privilege_level SMALLINT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    middlename VARCHAR(50),
    phone VARCHAR(20),
    home_address VARCHAR(100),
    is_registered BOOLEAN,
    registration_date TIMESTAMP,

    FOREIGN KEY(flock_id)
        REFERENCES flocks(flock_id),
    FOREIGN KEY(positions_id)
        REFERENCES assigned_positions(positions_id)
);

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    locale_id INTEGER NOT NULL,
    event_name VARCHAR(50) NOT NULL,

    FOREIGN KEY(locale_id)
        REFERENCES locales(locale_id),

    UNIQUE(locale_id, event_name)
);

CREATE TABLE attendance(
    attendance_id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    attendance_date DATE NOT NULL,
    attendance_time TIME WITH TIME ZONE NOT NULL,

    FOREIGN KEY(member_id)
        REFERENCES members(member_id),
    FOREIGN KEY(event_id)
        REFERENCES events(event_id),

    UNIQUE(member_id, event_id, attendance_date)
);
