const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

async function generateCandidates() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'recycling_manager_db'
  });

  const skillsPool = [
    'Leadership',
    'Safety Compliance',
    'Recycling Operations',
    'Sustainability',
    'Team Management',
    'Machinery Handling',
    'Process Optimization'
  ];

  for (let i = 0; i < 40; i++) {
    const name = faker.person.fullName();
    const experience = faker.number.int({ min: 1, max: 20 });
    const skills = faker.helpers
      .arrayElements(skillsPool, 3)
      .join(', ');

    await connection.execute(
      'INSERT INTO candidates (name, experience_years, skills) VALUES (?, ?, ?)',
      [name, experience, skills]
    );
  }

  console.log('✅ 40 candidates generated successfully');
  await connection.end();
}

generateCandidates().catch(console.error);
