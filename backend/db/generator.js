const { faker } = require('@faker-js/faker');
const mysql = require('mysql2/promise');

async function generateCandidates() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',  // ⚠️ CHANGE THIS to your MySQL password
    database: 'recycling_manager_db'
  });

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
  await connection.execute('TRUNCATE TABLE rankings');
  await connection.execute('TRUNCATE TABLE evaluations');
  await connection.execute('TRUNCATE TABLE candidates');
  await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

  const skillsPool = [
    'Leadership',
    'Safety Compliance',
    'Recycling Operations',
    'Sustainability',
    'Team Management',
    'Machinery Handling',
    'Process Optimization',
    'Environmental Regulations',
    'Waste Management',
    'Quality Control'
  ];

  console.log('🔄 Generating 40 candidates with evaluations...');

  for (let i = 0; i < 40; i++) {
    const name = faker.person.fullName();
    const experience = faker.number.int({ min: 1, max: 20 });
    const skills = faker.helpers
      .arrayElements(skillsPool, faker.number.int({ min: 3, max: 5 }))
      .join(', ');

    // Insert candidate
    const [result] = await connection.execute(
      'INSERT INTO candidates (name, experience_years, skills) VALUES (?, ?, ?)',
      [name, experience, skills]
    );

    const candidateId = result.insertId;

    // Generate AI evaluation scores (1-10)
    const crisisScore = faker.number.int({ min: 1, max: 10 });
    const sustainabilityScore = faker.number.int({ min: 1, max: 10 });
    const motivationScore = faker.number.int({ min: 1, max: 10 });

    // Insert evaluation (trigger will auto-update rankings)
    await connection.execute(
      'INSERT INTO evaluations (candidate_id, crisis_management, sustainability, team_motivation) VALUES (?, ?, ?, ?)',
      [candidateId, crisisScore, sustainabilityScore, motivationScore]
    );

    console.log(`✅ Generated: ${name} (${i + 1}/40)`);
  }

  // Update rank positions - FIXED: Execute queries separately
  console.log('📊 Calculating rankings...');
  
  // First, set the rank variable
  await connection.execute('SET @rank = 0');
  
  // Then update rankings with rank positions
  await connection.execute(`
    UPDATE rankings
    SET rank_position = (@rank := @rank + 1)
    ORDER BY total_score DESC
  `);

  console.log('✅ 40 candidates with evaluations generated successfully');
  
  // Verify data
  const [count] = await connection.execute('SELECT COUNT(*) as total FROM candidates');
  const [topRanked] = await connection.execute(`
    SELECT c.name, r.total_score, r.rank_position 
    FROM candidates c 
    JOIN rankings r ON c.id = r.candidate_id 
    ORDER BY r.rank_position ASC 
    LIMIT 3
  `);
  
  console.log(`\n📈 Database Summary:`);
  console.log(`   Total Candidates: ${count[0].total}`);
  console.log(`\n🏆 Top 3 Candidates:`);
  topRanked.forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.name} - Score: ${c.total_score}/30`);
  });
  
  await connection.end();
}

generateCandidates().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});