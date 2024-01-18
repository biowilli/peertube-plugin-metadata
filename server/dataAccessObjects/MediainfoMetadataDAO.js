const { v4: uuidv4 } = require("uuid");

class MediainfoMetadataDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_mediainfo_metadata (
        id VARCHAR(36) PRIMARY KEY,
        mediainfo TEXT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("fairkom_mediainfo_metadata table created successfully");
    } catch (error) {
      console.error("Error creating fairkom_mediainfo_metadata table:", error);
    }
  }

  async addMediainfoMetadata(mediainfoData) {
    const metadataId = uuidv4();
    const insertMetadataQuery = `
      INSERT INTO fairkom_mediainfo_metadata (id, mediainfo) VALUES (
        '${metadataId}',
        '${mediainfoData}'
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertMetadataQuery
      );
      console.log(
        `fairkom_mediainfo_metadata ${metadataId} added successfully`,
        result
      );
      return metadataId;
    } catch (error) {
      console.error("Error adding fairkom_mediainfo_metadata:", error);
      throw error;
    }
  }

  async getAllMediainfoMetadata() {
    const getAllMetadataQuery = `
      SELECT * FROM fairkom_mediainfo_metadata
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllMetadataQuery
      );
      console.log("Retrieved all fairkom_mediainfo_metadata:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting fairkom_mediainfo_metadata:", error);
      throw error;
    }
  }

  async findMediainfoMetadata(metadataId) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_mediainfo_metadata
      WHERE id = '${metadataId}'
    `;

    console.log("findMetadataQuery", findMetadataQuery);

    try {
      const result = await this.peertubeHelpers.database.query(
        findMetadataQuery
      );
      console.log("Found fairkom_mediainfo_metadata:", result);
      return result[0][0];
    } catch (error) {
      console.error("Error finding fairkom_mediainfo_metadata:", error);
      throw error;
    }
  }

  async modifyMediainfoMetadata(metadataId, updatedData) {
    const modifyMetadataQuery = `
      UPDATE fairkom_mediainfo_metadata
      SET
        mediainfo = '${updatedData.mediainfo}',
        modified_date = CURRENT_TIMESTAMP
      WHERE id = '${metadataId}'
      RETURNING *
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        modifyMetadataQuery
      );
      console.log("fairkom_mediainfo_metadata modified successfully");
      return result;
    } catch (error) {
      console.error("Error modifying fairkom_mediainfo_metadata:", error);
      throw error;
    }
  }

  async deleteMediainfoMetadata(metadataId) {
    const deleteMetadataQuery = `
      DELETE FROM fairkom_mediainfo_metadata
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        deleteMetadataQuery
      );
      console.log(
        `fairkom_mediainfo_metadata ${metadataId} deleted successfully`,
        result
      );
    } catch (error) {
      console.error("Error deleting fairkom_mediainfo_metadata:", error);
      throw error;
    }
  }
}

module.exports = {
  MediainfoMetadataDAO,
};
