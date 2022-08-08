const { Pool } = require("pg");

const pool = new Pool({
  user: "jacquelynhaug",
  password: "123",
  host: "localhost",
  port: "5432",
  database: "bootcampx"
});

const cohortsName = process.argv[2];

const limit = process.argv[3] || 5;

const values = [`%${cohortsName}%`, limit]

const queryString = `
SELECT students.id as students_id, students.name as name, cohorts.name as cohorts
FROM students 
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool
  .query(queryString, values)
  .then(res => { 
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  
  }).catch((err) => console.error("query error", err.stack));
