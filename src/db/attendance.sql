DROP TABLE areas CASCADE;
DROP TABLE subareas CASCADE;
DROP TABLE locales CASCADE;
DROP TABLE flocks CASCADE;
DROP TABLE positions CASCADE;
DROP TABLE assigned_positions CASCADE;
DROP TABLE members CASCADE;
DROP TABLE events CASCADE;
DROP TABLE attendance CASCADE;

CREATE TABLE areas(
    area_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    area_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE subareas(
    subarea_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    area_id INTEGER NOT NULL, 
    subarea_name VARCHAR(50) NOT NULL,

    FOREIGN KEY(area_id)
        REFERENCES areas(area_id),
    
    UNIQUE(area_id, subarea_name)
);

CREATE TABLE locales(
    locale_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    subarea_id INTEGER NOT NULL,
    locale_name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,

    FOREIGN KEY(subarea_id)
        REFERENCES subareas(subarea_id),

    UNIQUE(locale_name, country)
);

CREATE TABLE flocks(
    flock_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    locale_id INTEGER NOT NULL,
    flock_name VARCHAR(50) NOT NULL,

    FOREIGN KEY(locale_id)
        REFERENCES locales(locale_id),

    UNIQUE(locale_id, flock_name)
);

CREATE TABLE positions(
    position_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    position_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE members(
    member_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    flock_id INTEGER NOT NULL,
    privilege_level SMALLINT NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwd VARCHAR(64) NOT NULL,
    salt VARCHAR(16) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middlename VARCHAR(50),
    surname VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    home_address VARCHAR(100),
    is_registered BOOLEAN NOT NULL,
    registration_date TIMESTAMP NOT NULL,

    FOREIGN KEY(flock_id)
        REFERENCES flocks(flock_id),

    CHECK(privilege_level BETWEEN 0 AND 4)
);

CREATE TABLE assigned_positions(
    assigned_position_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    member_id INTEGER NOT NULL,
    position_id INTEGER NOT NULL,

    FOREIGN KEY(member_id)
        REFERENCES members(member_id),
    FOREIGN KEY(position_id)
        REFERENCES positions(position_id),
    
    UNIQUE(member_id, position_id)
);

CREATE TABLE events(
    event_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    locale_id INTEGER NOT NULL,
    event_name VARCHAR(50) NOT NULL,

    FOREIGN KEY(locale_id)
        REFERENCES locales(locale_id),

    UNIQUE(locale_id, event_name)
);

CREATE TABLE attendance(
    attendance_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
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


INSERT INTO areas (area_name) VALUES ('Philippi');
INSERT INTO areas (area_name) VALUES ('Patmos');

INSERT INTO subareas (area_id, subarea_name) VALUES(1, 'Yellow Gold');
INSERT INTO subareas (area_id, subarea_name) VALUES(2, 'Orange');

INSERT INTO locales (subarea_id, locale_name, country) VALUES(1, 'Madrid', 'Spain');
INSERT INTO locales (subarea_id, locale_name, country) VALUES(1, 'Barcelona', 'Spain');

INSERT INTO flocks (locale_id, flock_name) VALUES(1, 'Judea');
INSERT INTO flocks (locale_id, flock_name) VALUES(1, 'Patmos');

INSERT INTO positions (position_name) VALUES('member');
INSERT INTO positions (position_name) VALUES('officer');
INSERT INTO positions (position_name) VALUES('pastor');
INSERT INTO positions (position_name) VALUES('kawan leader');

INSERT INTO members (flock_id, privilege_level, username, passwd, salt, first_name, middlename, surname, phone, home_address, is_registered, registration_date) 
    VALUES(1, 4, 'richard', 'test', 'salt','Richard', 'Mercado', 'Correa', '662461018', 'San Bernardino 13', true, '2022-07-02 19:50:00-00');
INSERT INTO members (flock_id, privilege_level, username, passwd, salt, first_name, middlename, surname, phone, home_address, is_registered, registration_date) 
    VALUES(1, 0, 'pedro', 'test', 'salt','Pedro', 'Mercado', 'Correa', '662461018', 'San Bernardino 13', true, '2022-07-02 19:50:00-00');
INSERT INTO members (flock_id, privilege_level, username, passwd, salt, first_name, middlename, surname, phone, home_address, is_registered, registration_date) 
    VALUES(2, 0, 'marcos', 'test', 'salt','Marcos', 'Mercado', 'Correa', '662461018', 'San Bernardino 13', true, '2022-07-02 19:50:00-00');

INSERT INTO assigned_positions (member_id, position_id) VALUES(1, 1);
