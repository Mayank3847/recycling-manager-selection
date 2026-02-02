import { Title, Loader, Alert, SimpleGrid, Text, Group, Badge, Select } from '@mantine/core';
import { useState } from 'react';
import CandidateCard from './CandidateCard';
import { useCandidates } from '../hooks/useCandidates';
import './CandidateList.css';

export default function CandidateList() {
  const { candidates, loading, error } = useCandidates();
  const [sortBy, setSortBy] = useState('rank');

  if (loading) {
    return (
      <div className="loading-container">
        <Loader size="xl" type="dots" />
        <Text mt="md" ta="center" c="dimmed">Loading candidates...</Text>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert color="red" title="Error Loading Candidates" variant="filled">
        {error}
      </Alert>
    );
  }

  if (!Array.isArray(candidates) || candidates.length === 0) {
    return (
      <Alert color="yellow" title="No Candidates" variant="light">
        No candidates found. Run the generator to create 40 candidates.
      </Alert>
    );
  }

  // Sort candidates
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (sortBy === 'experience') return b.experience - a.experience;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="candidate-list-container">
      {/* Header */}
      <Group justify="space-between" mb="xl" className="list-header">
        <div>
          <Title order={2} className="list-title">
            All Candidates
          </Title>
          <Text size="sm" c="dimmed" mt={5}>
            Displaying all {candidates.length} evaluated candidates
          </Text>
        </div>
        
        <Group gap="md">
          <Badge size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            {candidates.length} Total
          </Badge>
          
          <Select
            label="Sort by"
            placeholder="Choose sorting"
            value={sortBy}
            onChange={setSortBy}
            data={[
              { value: 'rank', label: 'Rank (Best First)' },
              { value: 'experience', label: 'Experience (Most First)' },
              { value: 'name', label: 'Name (A-Z)' }
            ]}
            style={{ width: 200 }}
          />
        </Group>
      </Group>

      {/* Grid of Candidate Cards - 4 columns */}
      <SimpleGrid 
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        verticalSpacing="lg"
        className="candidates-grid"
      >
        {sortedCandidates.map((candidate, index) => (
          <div 
            key={candidate.id} 
            className="grid-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CandidateCard candidate={candidate} />
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}
