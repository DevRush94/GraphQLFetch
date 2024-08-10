import { gql } from '@apollo/client';

export const GET_CONTENT_CARDS = gql`
 query GetContentCards($keywords: String!, $limit: Int!) {
  contentCards(filter: { limit: $limit, keywords: $keywords, types: [PODCAST] }) {
   edges {
    ... on Podcast {
     name
     length
     image {
      uri
     }
     categories {
      name
     }
     experts {
      firstName
      lastName
      title
      company
     }
    }
   }
   meta {
    total
    limit
    offset
   }
  }
 }
`;
