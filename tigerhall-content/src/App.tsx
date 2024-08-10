import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTENT_CARDS } from './queries/content';
import { Box, Spinner, Grid, Flex, Center } from '@chakra-ui/react';
import Header from './components/Header';
import ContentCard from './components/ContentCard';

const App: React.FC = () => {
  const [keywords, setKeywords] = useState<string>('');
  const [debouncedKeywords, setDebouncedKeywords] = useState<string>('');
  const { loading, error, data, fetchMore } = useQuery(GET_CONTENT_CARDS, {
    variables: { keywords: debouncedKeywords, limit: 40 },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeywords(keywords);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [keywords]);

  const handleSearch = useCallback((searchTerm: string) => {
    setKeywords(searchTerm);
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMore({
        variables: { keywords: debouncedKeywords, limit: 20 },
      });
    }
  }, [debouncedKeywords, fetchMore, data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Box className="app">
      <Header keywords={keywords} setKeywords={setKeywords} onSearch={handleSearch} />
      <Box className="content-cards" mt={2} p={4}>
        {loading && (
          <Flex height="200px" alignItems="center" justifyContent="center">
            <Spinner size="lg" />
          </Flex>
        )}
        {(error || data?.contentCards?.edges?.length === 0) && <Box textAlign={"center"}>No Result Found</Box>}
        <Grid templateColumns="repeat(auto-fill, minmax(244px, 1fr))" gap={8}>
          {data &&
            data.contentCards &&
            data.contentCards.edges.map((card: any, index: number) => (
              <ContentCard
                key={index}
                name={card.name}
                image={card.image.uri.replace('https://images.staging.tigerhall.io/', 'https://images.staging.tigerhall.io/resize/244x122/')}
                categories={card.categories.map((c: any) => c.name)}
                experts={card.experts}
              />
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
