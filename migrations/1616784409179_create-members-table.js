/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.sql(`
    CREATE TABLE members (
      id SERIAL PRIMARY KEY,
      username VARCHAR(25) NOT NULL,
      rank VARCHAR(25) NOT NULL,
      race VARCHAR(25) NOT NULL,
      class VARCHAR(25) NOT NULL,
      joined TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
	pgm.sql(`
    DROP TABLE members;
  `);
};
