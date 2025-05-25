import { 
  Box, 
  Text, 
  VStack, 
  Link, 
  Heading,
  useColorModeValue
} from '@chakra-ui/react'

const About = () => {
  const bgColor = useColorModeValue('white', 'gray.900')
  const textColor = useColorModeValue('black', 'white')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
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
              About
            </Heading>
          </Box>

          {/* Overview */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
              mb={4}
            >
              The State Statutes Project is a collaborative effort to build a comprehensive 
              database of state-level legislation. Our goal is to make state statutes more 
              accessible and analyzable for researchers, policymakers, and the public. 
              You can read our original proposal{' '}
              <Link 
                href="https://wlr.law.wisc.edu/wp-content/uploads/sites/1263/2024/11/8-Guha-Zambrano-Camera-Ready.pdf"
                color={linkColor}
                textDecoration="underline"
                _hover={{ textDecoration: "none" }}
                isExternal
              >
                here
              </Link>.
            </Text>
            
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
            >
              This project is led by{' '}
              <Link 
                href="https://neelguha.github.io/"
                color={linkColor}
                textDecoration="underline"
                _hover={{ textDecoration: "none" }}
                isExternal
              >
                Neel Guha
              </Link>{' '}
              and{' '}
              <Link 
                href="mailto:dzambrano@law.stanford.edu"
                color={linkColor}
                textDecoration="underline"
                _hover={{ textDecoration: "none" }}
              >
                Diego Zambrano
              </Link>{' '}
              and hosted by the{' '}
              <Link 
                href="https://law.stanford.edu/neukom-center-for-the-rule-of-law/"
                color={linkColor}
                textDecoration="underline"
                _hover={{ textDecoration: "none" }}
                isExternal
              >
                Neukom Center for the Rule of Law
              </Link>. 
            </Text>
          </Box>

        </VStack>
      </Box>
    </Box>
  )
}

export default About