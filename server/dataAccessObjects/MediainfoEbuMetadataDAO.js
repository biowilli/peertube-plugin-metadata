const { v4: uuidv4 } = require("uuid");

class MediainfoEbuMetadataDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_mediainfo_metadata_ebu (
        id VARCHAR(36) PRIMARY KEY,
        mediainfo_ebu TEXT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("fairkom_mediainfo_metadata_ebu table created successfully");
    } catch (error) {
      console.error(
        "Error creating fairkom_mediainfo_metadata_ebu table:",
        error
      );
    }
  }

  async addMediainfoMetadataEBU(mediainfoDataEBU) {
    const metadataId = uuidv4();
    const insertMetadataQuery = `
      INSERT INTO fairkom_mediainfo_metadata_ebu (id, mediainfo_ebu) VALUES (
        '${metadataId}',
        '${mediainfoDataEBU}'
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertMetadataQuery
      );
      console.log(
        `fairkom_mediainfo_metadata_ebu ${metadataId} added successfully`,
        result
      );
      return metadataId;
    } catch (error) {
      console.error("Error adding fairkom_mediainfo_metadata_ebu:", error);
      throw error;
    }
  }

  async getAllMediainfoMetadataEBU() {
    const getAllMetadataQuery = `
      SELECT * FROM fairkom_mediainfo_metadata_ebu
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllMetadataQuery
      );
      console.log("Retrieved all fairkom_mediainfo_metadata_ebu:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting fairkom_mediainfo_metadata_ebu:", error);
      throw error;
    }
  }

  async findMediainfoMetadataEBU(metadataId) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_mediainfo_metadata_ebu
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findMetadataQuery
      );
      console.log("Found fairkom_mediainfo_metadata_ebu:", result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error("Error finding fairkom_mediainfo_metadata_ebu:", error);
      throw error;
    }
  }

  async modifyMediainfoMetadataEBU(metadataId, updatedData) {
    const modifyMetadataQuery = `
      UPDATE fairkom_mediainfo_metadata_ebu
      SET
        mediainfo_ebu = '${updatedData.mediainfo_ebu}',
        modified_date = CURRENT_TIMESTAMP
      WHERE id = '${metadataId}'
      RETURNING *
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        modifyMetadataQuery
      );
      console.log("fairkom_mediainfo_metadata_ebu modified successfully");
      return result;
    } catch (error) {
      console.error("Error modifying fairkom_mediainfo_metadata_ebu:", error);
      throw error;
    }
  }

  async deleteMediainfoMetadataEBU(metadataId) {
    const deleteMetadataQuery = `
      DELETE FROM fairkom_mediainfo_metadata_ebu
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        deleteMetadataQuery
      );
      console.log(
        `fairkom_mediainfo_metadata_ebu ${metadataId} deleted successfully`,
        result
      );
    } catch (error) {
      console.error("Error deleting fairkom_mediainfo_metadata_ebu:", error);
      throw error;
    }
  }
}

module.exports = {
  MediainfoEbuMetadataDAO,
};
