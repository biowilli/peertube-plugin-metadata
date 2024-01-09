const { v4: uuidv4 } = require("uuid");

class MetadataEBUDefaultDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_metadata_ebu_default (
        id VARCHAR(36) PRIMARY KEY,
        metadata_ebu_default TEXT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("Metadata EBU Default table created successfully");
    } catch (error) {
      console.error("Error creating metadata EBU Default table:", error);
    }
  }

  async addMetadataEBUDefault(metadataEBUDefaultData) {
    const metadataId = uuidv4();
    const insertMetadataQuery = `
      INSERT INTO fairkom_metadata_ebu_default (id, metadata_ebu_default) VALUES (
        '${metadataId}',
        '${metadataEBUDefaultData}'
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertMetadataQuery
      );
      console.log(
        `Metadata EBU Default ${metadataId} added successfully`,
        result
      );
      return metadataId;
    } catch (error) {
      console.error("Error adding metadata EBU Default:", error);
      throw error;
    }
  }

  async getAllMetadataEBUDefault() {
    const getAllMetadataQuery = `
      SELECT * FROM fairkom_metadata_ebu_default
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllMetadataQuery
      );
      console.log("Retrieved all metadata EBU Default:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting metadata EBU Default:", error);
      throw error;
    }
  }

  async findMetadataEBUDefault(metadataId) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_metadata_ebu_default
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findMetadataQuery
      );
      console.log("Found metadata EBU Default:", result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error("Error finding metadata EBU Default:", error);
      throw error;
    }
  }

  async modifyMetadataEBUDefault(metadataId, updatedData) {
    const modifyMetadataQuery = `
      UPDATE fairkom_metadata_ebu_default
      SET
        metadata_ebu_default = '${updatedData.metadata_ebu_default}',
        modified_date = CURRENT_TIMESTAMP
      WHERE id = '${metadataId}'
      RETURNING *
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        modifyMetadataQuery
      );
      console.log("Metadata EBU Default modified successfully");
      return result;
    } catch (error) {
      console.error("Error modifying metadata EBU Default:", error);
      throw error;
    }
  }

  async deleteMetadataEBUDefault(metadataId) {
    const deleteMetadataQuery = `
      DELETE FROM fairkom_metadata_ebu_default
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        deleteMetadataQuery
      );
      console.log(
        `Metadata EBU Default ${metadataId} deleted successfully`,
        result
      );
    } catch (error) {
      console.error("Error deleting metadata EBU Default:", error);
      throw error;
    }
  }
}

module.exports = {
  MetadataEBUDefaultDAO,
};
