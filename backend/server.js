const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',  // ⚠️ CHANGE THIS to your MySQL password
  database: 'recycling_manager_db',
  waitForConnections: true,
  connectionLimit: 10
});

// Test database connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.error('💡 Check:');
    console.error('   1. MySQL is running');
    console.error('   2. Password is correct in server.js');
    console.error('   3. Database "recycling_manager_db" exists');
  });

// Get all candidates with evaluations
app.get('/api/candidates', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        c.id,
        c.name,
        c.experience_years as experience,
        c.skills,
        e.crisis_management as crisis,
        e.sustainability,
        e.team_motivation as motivation,
        r.total_score,
        r.rank_position as \`rank\`
      FROM candidates c
      LEFT JOIN evaluations e ON c.id = e.candidate_id
      LEFT JOIN rankings r ON c.id = r.candidate_id
      ORDER BY r.total_score DESC
    `);
    
    console.log(`✅ Fetched ${rows.length} candidates`);
    res.json(rows);
  } catch (error) {
    console.error('❌ Error fetching candidates:', error.message);
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to fetch candidates from database'
    });
  }
});

// Get top 10 candidates
app.get('/api/leaderboard', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        c.id,
        c.name,
        r.total_score,
        r.rank_position as \`rank\`
      FROM candidates c
      JOIN rankings r ON c.id = r.candidate_id
      ORDER BY r.total_score DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Recycling Manager API',
    endpoints: [
      'GET /api/health',
      'GET /api/candidates',
      'GET /api/leaderboard'
    ]
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:5000`);
  console.log(`📊 Test endpoints:`);
  console.log(`   http://localhost:${PORT}/api/health`);
  console.log(`   http://localhost:${PORT}/api/candidates`);
  console.log(`   http://localhost:${PORT}/api/leaderboard`);
  console.log(`\n💡 Press Ctrl+C to stop the server`);
});