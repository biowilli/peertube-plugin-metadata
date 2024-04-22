const { v4: uuidv4 } = require("uuid");

class OrganizationDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_metadata_organization (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        abbrev VARCHAR(255),
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("fairkom_metadata_organization table created successfully");
    } catch (error) {
      console.error(
        "Error creating fairkom_metadata_organization table:",
        error
      );
    }
  }

  async addOrganization(organizationData) {
    const organizationId = uuidv4();
    const insertOrganizationQuery = `
      INSERT INTO fairkom_metadata_organization (id, name, abbrev) VALUES (
        '${organizationId}',
        '${organizationData.name}',
        '${organizationData.abbrev}'
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertOrganizationQuery
      );
      console.log(
        `fairkom_metadata_organization ${organizationId} added successfully`,
        result
      );
      return organizationData;
    } catch (error) {
      console.error("Error adding fairkom_metadata_organization:", error);
      throw error;
    }
  }

  async getAllOrganizations() {
    const getAllOrganizationsQuery = `
      SELECT * FROM fairkom_metadata_organization
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllOrganizationsQuery
      );
      console.log("Retrieved all fairkom_metadata_organization:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting fairkom_metadata_organization:", error);
      throw error;
    }
  }

  async findOrganization(organizationId) {
    const findOrganizationQuery = `
      SELECT * FROM fairkom_metadata_organization
      WHERE id = '${organizationId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findOrganizationQuery
      );
      console.log("Found fairkom_metadata_organization:", result[0]);
      return result[0];
    } catch (error) {
      console.error("Error finding fairkom_metadata_organization:", error);
      throw error;
    }
  }

  async modifyOrganization(organizationId, updatedData) {
    const modifyOrganizationQuery = `
      UPDATE fairkom_metadata_organization
      SET
        name = '${updatedData.name}',
        abbrev = '${updatedData.abbrev}',
        modified_date = CURRENT_TIMESTAMP
      WHERE id = '${organizationId}'
      RETURNING *
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        modifyOrganizationQuery
      );
      console.log("fairkom_metadata_organization modified successfully");
      return result;
    } catch (error) {
      console.error("Error modifying fairkom_metadata_organization:", error);
      throw error;
    }
  }

  async deleteOrganization(organizationId) {
    const deleteOrganizationQuery = `
      DELETE FROM fairkom_metadata_organization
      WHERE id = '${organizationId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        deleteOrganizationQuery
      );
      console.log(
        `fairkom_metadata_organization ${organizationId} deleted successfully`,
        result
      );
    } catch (error) {
      console.error("Error deleting fairkom_metadata_organization:", error);
      throw error;
    }
  }
}

module.exports = {
  OrganizationDAO,
};
