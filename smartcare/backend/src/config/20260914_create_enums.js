"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create ENUM types if they don't exist
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        CREATE TYPE appointment_status AS ENUM ('PENDING','CONFIRMED','COMPLETED','CANCELLED','NO_SHOW');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END$$;
    `);

    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        CREATE TYPE priority_level AS ENUM ('HIGH','MEDIUM','STANDARD');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END$$;
    `);

    // Alter appointments table to use these ENUMs
    await queryInterface.sequelize.query(`
      ALTER TABLE appointments
      ALTER COLUMN status TYPE appointment_status
      USING status::text::appointment_status;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE appointments
      ALTER COLUMN priority_level TYPE priority_level
      USING priority_level::text::priority_level;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Rollback: drop types (will cascade to columns)
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS appointment_status CASCADE;`,
    );
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS priority_level CASCADE;`,
    );
  },
};
