const { v4: uuidv4 } = require("uuid");
class CreatorDAO {
  constructor(peertubeHelpers) {
    this.peertubeHelpers = peertubeHelpers;
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS fairkom_metadata_creator (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255),
          familyname VARCHAR(255),
          username VARCHAR(255),
          occupation VARCHAR(255),
          email VARCHAR(255),
          url VARCHAR(255),
          address VARCHAR(255),
          deliverycode VARCHAR(255),
          city VARCHAR(255),
          state VARCHAR(255),
          country VARCHAR(255),
          telephone VARCHAR(255),
          mobile VARCHAR(255),
          stage VARCHAR(255),
          contacts VARCHAR(255),
          role VARCHAR(255),
          created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

    try {
      const result = await this.peertubeHelpers.database.query(
        createTableQuery
      );
      console.log("Creator table created successfully");
    } catch (error) {
      console.error("Error creating creator table:", error);
    }
  }

  async addCreator(creatorData) {
    const creatorId = uuidv4();
    const insertCreatorQuery = `
        INSERT INTO fairkom_metadata_creator ( 
          id, name, familyname, username, occupation, email, url,
          address, deliverycode, city, state, country,
          telephone, mobile, stage, contacts, role
          ) VALUES (
            '${creatorId}',
            '${creatorData.name}',
            '${creatorData.familyname}',
            '${creatorData.username}',
            '${creatorData.occupation}',
            '${creatorData.email}',
            '${creatorData.url}',
            '${creatorData.address}',
            '${creatorData.deliverycode}',
            '${creatorData.city}',
            '${creatorData.state}',
            '${creatorData.country}',
            '${creatorData.telephone}',
            '${creatorData.mobile}',
            '${creatorData.stage}',
            '${creatorData.contacts}',
            '${creatorData.role}'
          )
        `;

    try {
      const result = await this.peertubeHelpers.database.query(
        insertCreatorQuery
      );
      console.log(`Creator ${creatorId} added successfully`, result);
      return creatorData;
    } catch (error) {
      console.error("Error adding creator:", error);
      throw error;
    }
  }

  async getAllCreators() {
    const getAllCreatorsQuery = `
        SELECT * FROM fairkom_metadata_creator
      `;
    try {
      const result = await this.peertubeHelpers.database.query(
        getAllCreatorsQuery
      );
      console.log("Retrieved all creators:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting creators:", error);
      throw error;
    }
  }

  async findCreator(creatorId) {
    const findCreatorQuery = `
        SELECT * FROM fairkom_metadata_creator
        WHERE id = '${creatorId}'
      `;

    try {
      const result = await this.peertubeHelpers.database.query(
        findCreatorQuery
      );
      console.log("Found creator:", result[0]);
      return result[0];
    } catch (error) {
      console.error("Error finding creator:", error);
      throw error;
    }
  }
  async modifyCreator(creatorId, updatedData) {
    const modifyCreatorQuery = `
      UPDATE fairkom_metadata_creator
      SET
        name = '${updatedData.name}',
        familyname = '${updatedData.familyname}',
        username = '${updatedData.username}',
        occupation = '${updatedData.occupation}',
        email = '${updatedData.email}',
        url = '${updatedData.url}',
        address = '${updatedData.address}',
        deliverycode = '${updatedData.deliverycode}',
        city = '${updatedData.city}',
        state = '${updatedData.state}',
        country = '${updatedData.country}',
        telephone = '${updatedData.telephone}',
        mobile = '${updatedData.mobile}',
        stage = '${updatedData.stage}',
        contacts = '${updatedData.contacts}',
        role = '${updatedData.role}',
        modified_date = CURRENT_TIMESTAMP
      WHERE id = '${creatorId}'
      RETURNING *
    `;

    try {
      const result = await this.peertubeHelpers.database.query(
        modifyCreatorQuery
      );
      console.log("Creator modified successfully");
      return result;
    } catch (error) {
      console.error("Error modifying creator:", error);
      throw error;
    }
  }

  async deleteCreator(creatorId) {
    const deleteCreatorQuery = `
        DELETE FROM fairkom_metadata_creator
        WHERE id = '${creatorId}'
      `;

    try {
      const result = await this.peertubeHelpers.database.query(
        deleteCreatorQuery
      );
      console.log(`Creator ${creatorId} deleted successfully`, result);
    } catch (error) {
      console.error("Error deleting creator:", error);
      throw error;
    }
  }
}

module.exports = {
  CreatorDAO,
};
