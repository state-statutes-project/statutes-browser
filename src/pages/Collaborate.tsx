import { 
  Box, 
  Text, 
  VStack, 
  Heading,
  Link,
  useColorModeValue
} from '@chakra-ui/react'

const Collaborate = () => {
  const bgColor = useColorModeValue('white', 'gray.900')
  const textColor = useColorModeValue('black', 'white')
  const linkColor = useColorModeValue('blue.700', 'blue.400')

  return (
    <Box bg={bgColor} minH="90vh" py={16} px={8}>
      <Box maxW="800px">
        <VStack spacing={8} align="stretch">
          
          {/* Title */}
          <Box>
            <Heading 
              as="h1" 
              fontSize="3xl"
              fontWeight="400"
              color={textColor}
              mb={4}
            >
              Collaborate
            </Heading>
          </Box>

          {/* Introduction */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
              mb={4}
            >
              We're building a collaborative, community-led project to make state statutes 
              more accessible and analyzable. Whether you're a researcher, policymaker, or 
              technologist, we hope this project can support your work—and vice versa.
            </Text>
          </Box>

          {/* Ways to Contribute */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
              mb={6}
            >
              Here's how you can contribute:
            </Text>
            
            <VStack spacing={6} align="stretch">
              <Box pl={6}>
                <Text 
                  fontSize="md"
                  color={textColor}
                  lineHeight="1.6"
                >
                  → If you have state-level data (e.g., statutory annotations, or any data 
                  related to statutes), we'd love to establish formal links between our data 
                  and yours. We've been working on developing unique identifiers for our 
                  statutory text.
                </Text>
              </Box>

              <Box pl={6}>
                <Text 
                  fontSize="md"
                  color={textColor}
                  lineHeight="1.6"
                >
                  → If you have computational tools for doing statutory analysis, we'd love 
                  to find ways to showcase your tooling on our data.
                </Text>
              </Box>

              <Box pl={6}>
                <Text 
                  fontSize="md"
                  color={textColor}
                  lineHeight="1.6"
                >
                  → If you study state law, and are interested in a particular type of 
                  statute, we'd love to find ways this data can be useful for your research 
                  interests.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Additional Help */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
            >
              Finally, if you're just interested in helping out in any way–please let us know!
            </Text>
          </Box>


          {/* Contact */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
            >
              Contact us at{' '}
              <Link 
                href="mailto:nguha@cs.stanford.edu"
                color={linkColor}
                textDecoration="underline"
                _hover={{ textDecoration: "none" }}
              >
                nguha@cs.stanford.edu
              </Link>{' '}
              or{' '}
              <Link 
                href="mailto:dzambrano@law.stanford.edu"
                color={linkColor}
                textDecoration="underline"
                _hover={{ textDecoration: "none" }}
              >
                dzambrano@law.stanford.edu
              </Link>.
            </Text>
          </Box>

        </VStack>
      </Box>
    </Box>
  )
}

export default Collaborate