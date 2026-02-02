import { Card, Text, Group, Progress, Badge, ActionIcon, Tooltip, CopyButton, rem } from '@mantine/core';
import { IconCheck, IconCopy, IconBriefcase, IconTrophy } from '@tabler/icons-react';
import './CandidateCard.css';

export default function CandidateCard({ candidate }) {
  const shareableLink = `${window.location.origin}/candidate/${candidate.id}`;
  
  // Color based on score
  const getScoreColor = (score) => {
    if (score >= 9) return 'green';
    if (score >= 7) return 'blue';
    if (score >= 5) return 'yellow';
    if (score >= 3) return 'orange';
    return 'red';
  };

  const getScoreLabel = (score) => {
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Average';
    if (score >= 3) return 'Fair';
    return 'Poor';
  };

  return (
    <Card 
      shadow="md" 
      radius="lg" 
      className="candidate-card"
      withBorder
      padding="lg"
    >
      {/* Header */}
      <Group justify="space-between" mb="md">
        <div>
          <Group gap="xs">
            <Text fw={700} size="lg" className="candidate-name">
              {candidate.name}
            </Text>
            {candidate.rank && candidate.rank <= 3 && (
              <Badge 
                variant="gradient" 
                gradient={{ from: 'yellow', to: 'orange' }}
                leftSection={<IconTrophy size={14} />}
              >
                Rank #{candidate.rank}
              </Badge>
            )}
          </Group>
          <Group gap="xs" mt={5}>
            <IconBriefcase size={16} color="#666" />
            <Text size="sm" c="dimmed">
              {candidate.experience} years experience
            </Text>
          </Group>
        </div>
        
        {/* Share Button */}
        <CopyButton value={shareableLink} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip 
              label={copied ? 'Link Copied!' : 'Share Candidate'} 
              withArrow 
              position="left"
            >
              <ActionIcon 
                color={copied ? 'teal' : 'blue'} 
                variant="light" 
                onClick={copy}
                size="lg"
                radius="md"
                className="share-button"
              >
                {copied ? (
                  <IconCheck style={{ width: rem(18) }} />
                ) : (
                  <IconCopy style={{ width: rem(18) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>

      {/* Skills */}
      <div className="skills-section">
        <Text size="xs" fw={600} c="dimmed" mb={5}>SKILLS</Text>
        <Text size="sm" lineClamp={2}>
          {candidate.skills}
        </Text>
      </div>

      {/* Evaluation Scores */}
      <div className="scores-section">
        <Text size="xs" fw={600} c="dimmed" mb="sm">EVALUATION SCORES</Text>
        
        {/* Crisis Management */}
        <div className="score-item">
          <Group justify="space-between" mb={5}>
            <Text size="sm" fw={500}>Crisis Management</Text>
            <Badge 
              size="sm" 
              variant="light" 
              color={getScoreColor(candidate.crisis)}
            >
              {candidate.crisis}/10 • {getScoreLabel(candidate.crisis)}
            </Badge>
          </Group>
          <Progress 
            value={candidate.crisis * 10} 
            color={getScoreColor(candidate.crisis)}
            size="sm"
            radius="xl"
            animated
          />
        </div>

        {/* Sustainability */}
        <div className="score-item">
          <Group justify="space-between" mb={5}>
            <Text size="sm" fw={500}>Sustainability</Text>
            <Badge 
              size="sm" 
              variant="light" 
              color={getScoreColor(candidate.sustainability)}
            >
              {candidate.sustainability}/10 • {getScoreLabel(candidate.sustainability)}
            </Badge>
          </Group>
          <Progress 
            value={candidate.sustainability * 10} 
            color={getScoreColor(candidate.sustainability)}
            size="sm"
            radius="xl"
            animated
          />
        </div>

        {/* Team Motivation */}
        <div className="score-item">
          <Group justify="space-between" mb={5}>
            <Text size="sm" fw={500}>Team Motivation</Text>
            <Badge 
              size="sm" 
              variant="light" 
              color={getScoreColor(candidate.motivation)}
            >
              {candidate.motivation}/10 • {getScoreLabel(candidate.motivation)}
            </Badge>
          </Group>
          <Progress 
            value={candidate.motivation * 10} 
            color={getScoreColor(candidate.motivation)}
            size="sm"
            radius="xl"
            animated
          />
        </div>
      </div>

      {/* Total Score */}
      <Card.Section className="total-score-section" mt="md" p="md">
        <Group justify="space-between">
          <Text size="sm" fw={600} c="dimmed">TOTAL SCORE</Text>
          <Badge 
            size="xl" 
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            {candidate.total_score}/30
          </Badge>
        </Group>
      </Card.Section>
    </Card>
  );
}
