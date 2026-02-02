import { Table, Title, Paper, Loader, Alert, Text, Badge, Group, Avatar } from '@mantine/core';
import { IconTrophy, IconMedal } from '@tabler/icons-react';
import { useCandidates } from '../hooks/useCandidates';
import './Leaderboard.css';

export default function Leaderboard() {
  const { candidates, loading, error } = useCandidates();

  if (loading) {
    return (
      <Paper shadow="md" radius="lg" p="xl" className="leaderboard-paper">
        <Loader size="lg" type="dots" />
        <Text mt="md" ta="center">Loading leaderboard...</Text>
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error Loading Data" variant="filled">
        {error}
      </Alert>
    );
  }

  if (!Array.isArray(candidates) || candidates.length === 0) {
    return (
      <Alert color="yellow" title="No Candidates Found" variant="light">
        No candidates in database. Run the generator.
      </Alert>
    );
  }

  const topCandidates = candidates.slice(0, 10);

  const getRankBadge = (rank) => {
    if (rank === 1) return { color: 'yellow', icon: '🥇', gradient: { from: 'yellow', to: 'orange' } };
    if (rank === 2) return { color: 'gray', icon: '🥈', gradient: { from: 'gray', to: 'dark' } };
    if (rank === 3) return { color: 'orange', icon: '🥉', gradient: { from: 'orange', to: 'red' } };
    return { color: 'blue', icon: null, gradient: null };
  };

  const getScoreColor = (score) => {
    if (score >= 25) return 'green';
    if (score >= 20) return 'blue';
    if (score >= 15) return 'yellow';
    return 'orange';
  };

  return (
    <Paper shadow="md" radius="lg" className="leaderboard-paper">
      {/* Header */}
      <div className="leaderboard-header">
        <Group gap="sm">
          <IconTrophy size={32} color="#ffd43b" />
          <div>
            <Title order={2} className="leaderboard-title">
              Top 10 Candidates
            </Title>
            <Text size="sm" c="dimmed">
              Highest-ranked candidates based on total evaluation score
            </Text>
          </div>
        </Group>
      </div>

      {/* Top 3 Podium */}
      <div className="podium-section">
        {topCandidates.slice(0, 3).map((candidate) => {
          const rankInfo = getRankBadge(candidate.rank);
          return (
            <div 
              key={candidate.id} 
              className={`podium-card rank-${candidate.rank}`}
            >
              <div className="podium-rank-icon">{rankInfo.icon}</div>
              <Avatar 
                size="xl" 
                radius="xl" 
                className="podium-avatar"
                color={rankInfo.color}
              >
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Text fw={700} size="lg" mt="md" ta="center">
                {candidate.name}
              </Text>
              <Badge 
                size="lg" 
                variant="gradient" 
                gradient={rankInfo.gradient}
                mt="xs"
              >
                Score: {candidate.total_score}/30
              </Badge>
            </div>
          );
        })}
      </div>

      {/* Full Table */}
      <Table 
        striped 
        highlightOnHover 
        withTableBorder 
        withColumnBorders
        className="leaderboard-table"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: 80 }}>Rank</Table.Th>
            <Table.Th>Candidate Name</Table.Th>
            <Table.Th style={{ width: 150, textAlign: 'center' }}>Total Score</Table.Th>
            <Table.Th style={{ width: 120, textAlign: 'center' }}>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {topCandidates.map((candidate) => {
            const rankInfo = getRankBadge(candidate.rank);
            return (
              <Table.Tr 
                key={candidate.id} 
                className={`table-row rank-${candidate.rank}`}
              >
                <Table.Td>
                  <Group gap="xs">
                    {rankInfo.icon ? (
                      <span style={{ fontSize: '1.5rem' }}>{rankInfo.icon}</span>
                    ) : (
                      <IconMedal size={20} color="#868e96" />
                    )}
                    <Text fw={700} size="lg">#{candidate.rank}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size="md" radius="xl" color={rankInfo.color}>
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Text fw={600}>{candidate.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>
                  <Badge 
                    size="lg" 
                    variant="gradient"
                    gradient={{ from: getScoreColor(candidate.total_score), to: 'cyan' }}
                  >
                    {candidate.total_score}/30
                  </Badge>
                </Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>
                  <Badge 
                    size="md"
                    color={candidate.total_score >= 25 ? 'green' : candidate.total_score >= 20 ? 'blue' : 'yellow'}
                    variant="light"
                  >
                    {candidate.total_score >= 25 ? 'Excellent' : candidate.total_score >= 20 ? 'Good' : 'Average'}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
