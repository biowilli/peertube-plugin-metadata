const { v4: uuidv4 } = require("uuid");

class VideoMetadataDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS fairkom_videometadata (
        id VARCHAR(36) PRIMARY KEY,
        fk_ffprobe_metadata_id VARCHAR(36) REFERENCES fairkom_ffprobe_metadata(id) ON DELETE CASCADE,
        fk_mediainfo_metadata_id VARCHAR(36) REFERENCES fairkom_mediainfo_metadata(id) ON DELETE CASCADE,
        fk_mediainfo_metadata_ebu_id VARCHAR(36) REFERENCES fairkom_mediainfo_metadata_ebu(id) ON DELETE CASCADE,
        fk_metadata_ebu_default_id VARCHAR(36) REFERENCES fairkom_metadata_ebu_default(id) ON DELETE CASCADE,
        fk_video_id INTEGER REFERENCES video(id),
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("fairkom_videometadata table created successfully");
    } catch (error) {
      console.error("Error creating fairkom_videometadata table:", error);
    }
  }

  async addVideoMetadata(videoMetadataData) {
    console.log("hiervideoMetadataDataasdasdasdassddas");
    console.log(videoMetadataData);
    const metadataId = uuidv4();
    const insertMetadataQuery = `
      INSERT INTO fairkom_videometadata (
        id,
        fk_ffprobe_metadata_id,
        fk_mediainfo_metadata_id,
        fk_mediainfo_metadata_ebu_id,
        fk_metadata_ebu_default_id,
        fk_video_id
      ) VALUES (
        '${metadataId}',
        '${videoMetadataData.fk_ffprobe_metadata_id}',
        '${videoMetadataData.fk_mediainfo_metadata_id}',
        '${videoMetadataData.fk_mediainfo_metadata_ebu_id}',
        '${videoMetadataData.fk_metadata_ebu_default_id}',
        ${videoMetadataData.fk_video_id}
      )
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertMetadataQuery
      );
      console.log(
        `fairkom_videometadata ${metadataId} added successfully`,
        result
      );
      return videoMetadataData;
    } catch (error) {
      console.error("Error adding fairkom_videometadata:", error);
      throw error;
    }
  }

  async getAllVideoMetadata() {
    const getAllVideoMetadataQuery = `
      SELECT * FROM fairkom_videometadata
    `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllVideoMetadataQuery
      );
      console.log("Retrieved all fairkom_videometadata:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting fairkom_videometadata:", error);
      throw error;
    }
  }

  async findVideoMetadataByVideoId(videoId) {
    const findVideoMetadataQuery = `
      SELECT * FROM fairkom_videometadata
      WHERE fk_video_id = '${videoId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findVideoMetadataQuery
      );
      console.log("Found fairkom_videometadata:", result);
      return result[0][0];
    } catch (error) {
      console.error("Error finding fairkom_videometadata:", error);
      throw error;
    }
  }

  async modifyVideoMetadata(metadataId, updatedData) {
    const modifyVideoMetadataQuery = `
      UPDATE fairkom_videometadata
      SET
        fk_ffprobe_metadata_id = '${updatedData.fk_ffprobe_metadata_id}',
        fk_mediainfo_metadata_id = '${updatedData.fk_mediainfo_metadata_id}',
        fk_mediainfo_metadata_ebu_id = '${updatedData.fk_mediainfo_metadata_ebu_id}',
        fk_metadata_ebu_default_id = '${updatedData.fk_metadata_ebu_default_id}',
        fk_video_id = ${updatedData.fk_video_id},
        modified_date = CURRENT_TIMESTAMP
      WHERE id = '${metadataId}'
      RETURNING *
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        modifyVideoMetadataQuery
      );
      console.log("fairkom_videometadata modified successfully");
      return result;
    } catch (error) {
      console.error("Error modifying fairkom_videometadata:", error);
      throw error;
    }
  }

  async deleteVideoMetadata(metadataId) {
    const deleteVideoMetadataQuery = `
      DELETE FROM fairkom_videometadata
      WHERE id = '${metadataId}'
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        deleteVideoMetadataQuery
      );
      console.log(
        `fairkom_videometadata ${metadataId} deleted successfully`,
        result
      );
    } catch (error) {
      console.error("Error deleting fairkom_videometadata:", error);
      throw error;
    }
  }
}

module.exports = {
  VideoMetadataDAO,
};
