const { v4: uuidv4 } = require("uuid");

class SyncedMetadataDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_synced_metadata (
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
      console.log("Synced Metadata table created successfully");
    } catch (error) {
      console.error("Error creating Synced Metadata table:", error.message);
    }
  }

  async addSyncedMetadata(metadataData, fkVideoId) {
    const metadataId = uuidv4();
    console.log(fkVideoId);
    console.log(metadataData);

    const insertMetadataQuery = `
      INSERT INTO fairkom_synced_metadata (id, fk_video_id, metadata) VALUES (
        '${metadataId}',
        ${fkVideoId},
        '${metadataData}'
      )
    `;
    console.log(insertMetadataQuery);
    try {
      const result = await this.peertubeHelpers.database.query(
        insertMetadataQuery,
        [metadataId, fkVideoId, metadataData]
      );
      console.log(`Synced Metadata ${metadataId} added successfully`, result);
      return metadataId;
    } catch (error) {
      console.error("Error adding Synced Metadata:", error.message);
      throw error;
    }
  }

  async getAllSyncedMetadata() {
    const getAllMetadataQuery = `
      SELECT * FROM fairkom_synced_metadata
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllMetadataQuery
      );
      console.log("Retrieved all Synced Metadata:", result);
      return result.rows;
    } catch (error) {
      console.error("Error getting Synced Metadata:", error.message);
      throw error;
    }
  }

  async findSyncedMetadata(fkVideoId) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_synced_metadata
      WHERE fk_video_id = '${fkVideoId}'
      ORDER BY created_date DESC 
      LIMIT 1;
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findMetadataQuery
      );
      console.log("Found Synced Metadata:", result.rows);
      return result.rows;
    } catch (error) {
      console.error("Error finding Synced Metadata:", error.message);
      throw error;
    }
  }

  //TODO: versioning
  async findSyncedMetadataDate(fkVideoId, date) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_synced_metadata
      WHERE fk_video_id = '${fkVideoId}' and modified_date = $2 
      ORDER BY created_date DESC 
      LIMIT 1;
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findMetadataQuery
      );
      console.log("Found Synced Metadata:", result.rows);
      return result.rows;
    } catch (error) {
      console.error("Error finding Synced Metadata:", error.message);
      throw error;
    }
  }
}

module.exports = {
  SyncedMetadataDAO,
};
