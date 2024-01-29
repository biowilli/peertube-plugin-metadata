const { v4: uuidv4 } = require("uuid");

class MetadataDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_metadata (
        id VARCHAR(36) PRIMARY KEY,
        fk_video_id INTEGER REFERENCES video(id) ON DELETE CASCADE,
        metadata TEXT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("fairkom_metadata table created successfully");
    } catch (error) {
      console.error("Error creating fairkom_metadata table:", error);
    }
  }

  async addMetadata(metadata, fkVideoId) {
    const metadataId = uuidv4();
    const insertMetadataQuery = `
      INSERT INTO fairkom_metadata (id, fk_video_id, metadata) VALUES (
        '${metadataId}',
        '${fkVideoId}',
        '${metadata}'
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertMetadataQuery
      );
      console.log(`fairkom_metadata ${metadataId} added successfully`, result);
      return metadataId;
    } catch (error) {
      console.error("Error adding fairkom_metadata:", error);
      throw error;
    }
  }

  async getAllMetadata() {
    const getAllMetadataQuery = `
      SELECT * FROM fairkom_metadata
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllMetadataQuery
      );
      console.log("Retrieved all fairkom_metadata:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting fairkom_metadata:", error);
      throw error;
    }
  }

  async findMetadata(fkVideoId) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_metadata
      WHERE fk_video_id = '${fkVideoId}'
      ORDER BY created_date DESC 
      LIMIT 1;
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findMetadataQuery
      );
      console.log("Found fairkom_metadata:", result);
      return result;
    } catch (error) {
      console.error("Error finding fairkom_metadata:", error);
      throw error;
    }
  }
}

module.exports = {
  MetadataDAO,
};
