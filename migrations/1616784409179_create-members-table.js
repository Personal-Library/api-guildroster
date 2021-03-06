/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.sql(`
    CREATE TABLE members (
      id SERIAL PRIMARY KEY,
      username VARCHAR(25) NOT NULL,
      rank VARCHAR(25) NOT NULL,
      race VARCHAR(25) NOT NULL,
      classname VARCHAR(25) NOT NULL,
      joined TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(200) NOT NULL
    );
  `);
};

exports.down = (pgm) => {
	pgm.sql(`
    DROP TABLE members;
    DROP TABLE users;
  `);
};
