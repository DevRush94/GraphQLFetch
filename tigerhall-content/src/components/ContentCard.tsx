import React from 'react';
import { Box, Image, Text, Heading, Flex } from '@chakra-ui/react';

interface ContentCardProps {
 name: string;
 image: string;
 categories: string[];
 experts: { firstName: string; lastName: string; title: string; company: string }[];
}

const ContentCard: React.FC<ContentCardProps> = ({ name, image, categories, experts }) => {
 return (
  <Box className="content-card" borderRadius="lg" overflow="hidden" boxShadow="md" bg={'#fff'} color={'#000'}>
   <Image src={image} alt={name} />
   <Box p={4}>
    <Heading as="h1" size="md" mb={2} textTransform={'capitalize'}>
     {name}
    </Heading>

    <Text fontSize="sm" color="gray.500" mb={4}>
     {categories.join(', ')}
    </Text>

    <Flex direction="column" gap={2}>
     {experts.map((expert, index) => (
      <Text key={index} fontSize="sm">
       {expert.firstName} {expert.lastName}, {expert.title} at {expert.company}
      </Text>
     ))}
    </Flex>
   </Box>
  </Box>
 );
};

export default ContentCard;
