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
        fk_video_id INTEGER REFERENCES video(id) ON DELETE CASCADE,
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

  async addFfprobeMetadata(ffprobeData, fkVideoId) {
    const metadataId = uuidv4();
    const insertMetadataQuery = `
      INSERT INTO fairkom_ffprobe_metadata (id, fk_video_id, ffprobe) VALUES (
        '${metadataId}',
        '${fkVideoId}',
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

  async findFfprobeMetadata(fkVideoId) {
    const findMetadataQuery = `
      SELECT * FROM fairkom_ffprobe_metadata
      WHERE fk_video_id = '${fkVideoId}'
      ORDER BY created_date DESC 
      LIMIT 1;
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
}

module.exports = {
  FfprobeMetadataDAO,
};
