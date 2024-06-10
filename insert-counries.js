const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'fuap_dev',
  password: 'fuap',
  port: 5432,
});

// Datos de ejemplo
// const countries = [];

// const states = [];

const townships = [
  {
    id: "601170d32b16b26505323905",
    name: "Ystalyfera",
    stateId: "5ed0196f94ef8a7ce8b674ca"
  }
];

// const parishes = [
//   {
//     id: "5d9c78bc3201d3193c471f50",
//     name: "LA BORRACHA",
//     townshipId: "5d9b92423201d3193c471ad9"
//   }
// ];



async function insertData() {
  try {
    // Conectar al cliente
    await client.connect();

    // Insertar países
    // for (const country of countries) {
    //   const insertCountryQuery = `
    //     INSERT INTO country (_id, name, iso3, iso2, "dialCode")
    //     VALUES ($1, $2, $3, $4, $5)
    //   `;
    //   await client.query(insertCountryQuery, [country._id, country.name, country.iso3, country.iso2, country.dialCode]);
    //   console.log(`Inserted country: ${country.name}`);
    // }

    // Insertar estados
    for (const state of states) {
      // Buscar el ID del país relacionado
      const findCountryQuery = `
        SELECT id FROM country WHERE _id = $1
      `;
      const res = await client.query(findCountryQuery, [state.country]);
      const countryId = res.rows[0]?.id;

      if (countryId) {
        const insertStateQuery = `
          INSERT INTO state ("_id", "name", "countryId")
          VALUES ($1, $2, $3)
        `;
        await client.query(insertStateQuery, [state._id, state.name, countryId]);
        console.log(`Inserted state: ${state.name}`);
      } else {
        console.error(`Country with ID ${state.country} not found for state ${state.name}`);
      }
    }

    // Insertar townships
    // for (const township of townships) {
    //   const insertTownshipQuery = `
    //     INSERT INTO township (id, name, stateId, isActive, isDeleted, createdAt, updatedAt)
    //     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    //   `;
    //   await client.query(insertTownshipQuery, [township.id, township.name, township.stateId, true, false]);
    //   console.log(`Inserted township: ${township.name}`);
    // }

    // // Insertar parroquias
    // for (const parish of parishes) {
    //   const insertParishQuery = `
    //     INSERT INTO parish (id, name, townshipId, createdAt, updatedAt)
    //     VALUES ($1, $2, $3, NOW(), NOW())
    //   `;
    //   await client.query(insertParishQuery, [parish.id, parish.name, parish.townshipId]);
    //   console.log(`Inserted parish: ${parish.name}`);
    // }

    console.log('All data has been inserted');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Cerrar la conexión al cliente
    await client.end();
    console.log('Client has been disconnected');
  }
}

// Ejecutar la función de inserción
insertData();
