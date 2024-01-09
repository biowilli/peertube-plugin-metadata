const { v4: uuidv4 } = require("uuid");

class FfprobeMetadataDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_ffprobe_metadata (
        id VARCHAR(36) PRIMARY KEY,
        ffprobe TEXT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("fairkom_ffprobe_metadata table created successfully");
    } catch (error) {
      console.error("Error creating fairkom_ffprobe_metadata table:", error);
    }
  }

  async addFfprobeMetadata(ffprobeData) {
    const metadataId = uuidv4();
    const insertMetadataQuery = `
      INSERT INTO fairkom_ffprobe_metadata (id, ffprobe) VALUES (
        '${metadataId}',
        '${ffprobeData}'
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertMetadataQuery
      );
      console.log(
        `fairkom_ffprobe_metadata ${metadataId} added successfully`,
        result
      );
      return metadataId;
    } catch (error) {
      console.error("Error adding fairkom_ffprobe_metadata:", error);
      throw error;
    }
  }

  async getAllFfprobeMetadata() {
    const getAllMetadataQuery = `
      SELECT * FROM fairkom_ffprobe_metadata
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllMetadataQuery
      );
      console.log("Retrieved all fairkom_ffprobe_metadata:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting fairkom_ffprobe_metadata:", error);
      throw error;
    }
  }

  async findFfprobeMetadata(metadataId) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_ffprobe_metadata
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findMetadataQuery
      );
      console.log("Found fairkom_ffprobe_metadata:", result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error("Error finding fairkom_ffprobe_metadata:", error);
      throw error;
    }
  }

  async modifyFfprobeMetadata(metadataId, updatedData) {
    const modifyMetadataQuery = `
      UPDATE fairkom_ffprobe_metadata
      SET
        ffprobe = '${updatedData.ffprobe}',
        modified_date = CURRENT_TIMESTAMP
      WHERE id = '${metadataId}'
      RETURNING *
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        modifyMetadataQuery
      );
      console.log("fairkom_ffprobe_metadata modified successfully");
      return result;
    } catch (error) {
      console.error("Error modifying fairkom_ffprobe_metadata:", error);
      throw error;
    }
  }

  async deleteFfprobeMetadata(metadataId) {
    const deleteMetadataQuery = `
      DELETE FROM fairkom_ffprobe_metadata
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        deleteMetadataQuery
      );
      console.log(
        `fairkom_ffprobe_metadata ${metadataId} deleted successfully`,
        result
      );
    } catch (error) {
      console.error("Error deleting fairkom_ffprobe_metadata:", error);
      throw error;
    }
  }
}

module.exports = {
  FfprobeMetadataDAO,
};
