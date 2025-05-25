import { 
  Box, 
  Text, 
  VStack, 
  Link, 
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  const bgColor = useColorModeValue('white', 'gray.900')
  const textColor = useColorModeValue('black', 'white')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const linkColor = useColorModeValue('blue.700', 'blue.400')

  return (
    <Box bg={bgColor} minH="90vh" py={16} px={8}>
      <Box maxW="800px">
        <VStack spacing={12} align="stretch">
          
          {/* Title */}
          <Box>
            <Heading 
              as="h1" 
              fontSize="3xl"
              fontWeight="400"
              color={textColor}
              mb={4}
            >
              The State Statutes Project
            </Heading>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
            >
              The <b>State Statutes Project</b> aims to make research and analysis of state law easier.
            </Text>
          </Box>

          {/* Goals */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
              mb={6}
            >
              We have three core goals:
            </Text>
            
            <VStack spacing={6} align="stretch">
              <Box pl={6}>
                <Text 
                  fontSize="md"
                  color={textColor}
                  lineHeight="1.6"
                > 
                  <Text as="span" fontWeight="500">
                    1. <u>Expand access to statutory text for research.</u>
                  </Text>{' '}
                  We're building a structured, open-access database of state statutes to support empirical research across disciplines. 
                  Our goal is to make statutory text easier to browse, search, and analyze—across time, jurisdictions, and legal domains.
                </Text>
              </Box>

              <Box pl={6}>
                <Text 
                  fontSize="md"
                  color={textColor}
                  lineHeight="1.6"
                >
                  <Text as="span" fontWeight="500">
                    2. <u>Use large language models to generate rich legal annotations.</u>
                  </Text>{' '}
                  We're experimenting with LLMs to classify statutory clauses—such as identifying private rights of action or model code overlaps. 
                  Our longer-term aim is to develop a flexible, richly tagged knowledge base that helps scholars study legal structures at scale.
                </Text>
              </Box>

              <Box pl={6}>
                <Text 
                  fontSize="md"
                  color={textColor}
                  lineHeight="1.6"
                >
                  <Text as="span" fontWeight="500">
                    3. <u>Foster a collaborative, community-driven effort.</u>
                  </Text>{' '}
                  We view this project as a shared resource. If you have datasets, ideas, or tools—or want to propose new variables to annotate—
                  we’d love to connect. Whether you're a legal scholar, policymaker, or technologist, we hope this platform can support your work—and benefit from it.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Call to Action */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
              mb={4}
            >
              Please{' '}
              <Link 
                as={RouterLink} 
                to="/collaborate" 
                color={linkColor}
                textDecoration="underline"
                _hover={{ textDecoration: "none" }}
              >
                reach out
              </Link>! This project is just getting started—and we're excited to see 
              where it can go with your help.
            </Text>
          </Box>

        </VStack>
      </Box>
    </Box>
  )
}

export default Home