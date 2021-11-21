import * as React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Heading, Link, Text } from '@chakra-ui/layout'
import { Query } from '../../graphql/generated-types'
import { Spinner } from '@chakra-ui/spinner'

export const bookQuery = gql`
  query Book($id: ID) {
    book(id: $id) {
      id
      title
      author {
        id
        name
      }
    }
  }
`

function BooksDetails() {
  const { bookId } = useParams()
  const { data, loading, error } = useQuery<{ book: Query['book'] }>(
    bookQuery,
    { variables: { id: bookId } },
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <p>Error while fetching books data: ({error.message})</p>
  }

  return (
    <>
      <Link as={RouterLink} to="/">
        Back to listing
      </Link>
      <Box mt={4}>
        <Heading mb={4}>{data?.book.title}</Heading>
        <Text>Author: {data?.book.author.name}</Text>
      </Box>
    </>
  )
}

export default BooksDetails
