import { gql } from '@apollo/client';

export const GET_CONTENT_CARDS = gql`
  query GetContentCards($keywords: String!, $limit: Int!) {
    contentCards(filter: { limit: $limit, keywords: $keywords, types: [PODCAST] }) {
      edges {
        ... on Podcast {
          name
          length
          image {
            ...Image
          }
          categories {
            ...Category
          }
          experts {
            ...Expert
          }
        }
      }
    }
  }

  fragment Image on Image {
    uri
  }

  fragment Category on Category {
    name
  }

  fragment Expert on Expert {
    firstName
    lastName
    title
    company
  }
`;
