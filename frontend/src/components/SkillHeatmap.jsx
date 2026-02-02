import { Table, Title, Paper, Group, ColorSwatch, Text, Badge } from '@mantine/core';
import { IconFlame } from '@tabler/icons-react';
import { useCandidates } from '../hooks/useCandidates';
import './SkillHeatmap.css';

export default function SkillHeatmap() {
  const { candidates, loading, error } = useCandidates();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text c="red">{error}</Text>;
  if (!candidates || candidates.length === 0) return <Text>No data</Text>;

  const topCandidates = [...candidates]
    .sort((a, b) => b.total_score - a.total_score)
    .slice(0, 15);

  const getColor = (score) => {
    if (score >= 9) return '#2f9e44';
    if (score >= 7) return '#51cf66';
    if (score >= 5) return '#ffd43b';
    if (score >= 3) return '#ff8787';
    return '#fa5252';
  };

  const getLabel = (score) => {
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Average';
    if (score >= 3) return 'Fair';
    return 'Poor';
  };

  return (
    <Paper shadow="md" radius="lg" className="heatmap-paper">
      {/* Header */}
      <div className="heatmap-header">
        <Group gap="sm">
          <IconFlame size={32} color="#fd7e14" />
          <div>
            <Title order={2} className="heatmap-title">
              Skill Heatmap
            </Title>
            <Text size="sm" c="dimmed">
              Top 15 candidates across all evaluation metrics
            </Text>
          </div>
        </Group>
      </div>

      {/* Table */}
      <Table 
        striped 
        highlightOnHover 
        withTableBorder 
        withColumnBorders
        className="heatmap-table"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: '25%' }}>Candidate</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Crisis Mgmt</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Sustainability</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Team Motivation</Table.Th>
            <Table.Th style={{ textAlign: 'center', width: 120 }}>Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {topCandidates.map((candidate, index) => (
            <Table.Tr 
              key={candidate.id}
              className="heatmap-row"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Table.Td>
                <div>
                  <Text fw={600} size="sm">
                    {candidate.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Rank #{candidate.rank}
                  </Text>
                </div>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <Group gap="xs" justify="center">
                  <ColorSwatch 
                    color={getColor(candidate.crisis)} 
                    size={24}
                    className="score-swatch"
                  />
                  <div>
                    <Text size="sm" fw={600}>{candidate.crisis}/10</Text>
                    <Text size="xs" c="dimmed">{getLabel(candidate.crisis)}</Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <Group gap="xs" justify="center">
                  <ColorSwatch 
                    color={getColor(candidate.sustainability)} 
                    size={24}
                    className="score-swatch"
                  />
                  <div>
                    <Text size="sm" fw={600}>{candidate.sustainability}/10</Text>
                    <Text size="xs" c="dimmed">{getLabel(candidate.sustainability)}</Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <Group gap="xs" justify="center">
                  <ColorSwatch 
                    color={getColor(candidate.motivation)} 
                    size={24}
                    className="score-swatch"
                  />
                  <div>
                    <Text size="sm" fw={600}>{candidate.motivation}/10</Text>
                    <Text size="xs" c="dimmed">{getLabel(candidate.motivation)}</Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <Badge 
                  size="lg" 
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                >
                  {candidate.total_score}/30
                </Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Legend */}
      <div className="heatmap-legend">
        <Text size="sm" fw={600} mb="xs">Performance Legend:</Text>
        <Group gap="lg">
          <Group gap="xs">
            <ColorSwatch color="#2f9e44" size={18} />
            <Text size="xs">9-10 • Excellent</Text>
          </Group>
          <Group gap="xs">
            <ColorSwatch color="#51cf66" size={18} />
            <Text size="xs">7-8 • Good</Text>
          </Group>
          <Group gap="xs">
            <ColorSwatch color="#ffd43b" size={18} />
            <Text size="xs">5-6 • Average</Text>
          </Group>
          <Group gap="xs">
            <ColorSwatch color="#ff8787" size={18} />
            <Text size="xs">3-4 • Fair</Text>
          </Group>
          <Group gap="xs">
            <ColorSwatch color="#fa5252" size={18} />
            <Text size="xs">1-2 • Poor</Text>
          </Group>
        </Group>
      </div>
    </Paper>
  );
}
