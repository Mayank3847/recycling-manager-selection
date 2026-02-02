import { MantineProvider, Container, Title, Tabs, Badge, Group, Text } from '@mantine/core';
import { IconTrophy, IconChartBar, IconUsers } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import Leaderboard from './components/Leaderboard';
import SkillHeatmap from './components/SkillHeatmap';
import CandidateList from './components/CandidateList';
import './App.css';

export default function App() {
  return (
    <MantineProvider>
      <div className="app-wrapper">
        <Container size="xl" py="xl">
          {/* Header */}
          <div className="header-section">
            <Title order={1} className="main-title">
              🌿 Recycling Production Line Manager
            </Title>
            <Text size="lg" c="dimmed" mt="xs" className="subtitle">
              AI-Powered Candidate Evaluation & Ranking System
            </Text>
            <Group gap="xs" mt="md" justify="center">
              <Badge variant="light" color="blue" size="lg">40 Candidates</Badge>
              <Badge variant="light" color="green" size="lg">3 Metrics</Badge>
              <Badge variant="light" color="orange" size="lg">Auto-Ranked</Badge>
            </Group>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="leaderboard" variant="pills" className="dashboard-tabs" mt="xl">
            <Tabs.List grow>
              <Tabs.Tab 
                value="leaderboard" 
                leftSection={<IconTrophy size={18} />}
              >
                Top 10 Leaderboard
              </Tabs.Tab>
              <Tabs.Tab 
                value="heatmap" 
                leftSection={<IconChartBar size={18} />}
              >
                Skill Heatmap
              </Tabs.Tab>
              <Tabs.Tab 
                value="all" 
                leftSection={<IconUsers size={18} />}
              >
                All Candidates
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="leaderboard" pt="xl">
              <Leaderboard />
            </Tabs.Panel>

            <Tabs.Panel value="heatmap" pt="xl">
              <SkillHeatmap />
            </Tabs.Panel>

            <Tabs.Panel value="all" pt="xl">
              <CandidateList />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </div>
    </MantineProvider>
  );
}
