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

INSERT INTO assigned_positions (positions_id, position_id) VALUES(1, 1);
INSERT INTO assigned_positions (positions_id, position_id) VALUES(2, 3);
INSERT INTO assigned_positions (positions_id, position_id) VALUES(2, 1);
INSERT INTO assigned_positions (positions_id, position_id) VALUES(3, 1);
INSERT INTO assigned_positions (positions_id, position_id) VALUES(4, 1);
INSERT INTO assigned_positions (positions_id, position_id) VALUES(4, 2);

INSERT INTO members (flock_id, positions_id, privilege_level, username, passwd, salt, first_name, middlename, surname, phone, home_address, is_registered, registration_date) 
    VALUES(1, 1, 4, 'richard', 'test', 'salt','Richard', 'Mercado', 'Correa', '662461018', 'San Bernardino 13', true, '2022-07-02 19:50:00-00');
