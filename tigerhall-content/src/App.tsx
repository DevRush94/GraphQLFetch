import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTENT_CARDS } from './queries/content';
import Search from './components/Search';
import ContentCard from './components/ContentCard';

const App: React.FC = () => {
  const [keywords, setKeywords] = useState<string>('');
  const { loading, error, data, fetchMore } = useQuery(GET_CONTENT_CARDS, {
    variables: { keywords, limit: 20 },
  });

  const handleSearch = useCallback((searchTerm: string) => {
    setKeywords(searchTerm);
    fetchMore({
      variables: { keywords: searchTerm, limit: 20 },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult ? fetchMoreResult : prev;
      },
    });
  }, [fetchMore]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      fetchMore({
        variables: { keywords, limit: 20, start: data.contentCards.edges.length },
      });
    }
  }, [keywords, fetchMore, data]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);



  return (
    <div className="app">
      <Search keywords={keywords} setKeywords={setKeywords} onSearch={handleSearch} />
      <div className="content-cards">
        {data && data.contentCards && data.contentCards.edges.map((card: any, index: number) => (
          <ContentCard
            key={index}
            name={card.name}
            image={`https://images.staging.tigerhall.io/resize/244x120/${card.image.uri}`}
            categories={card.categories.map((c: any) => c.name)}
            experts={card.experts}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
