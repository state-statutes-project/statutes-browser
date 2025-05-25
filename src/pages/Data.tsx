import { 
  Box, 
  Text, 
  VStack, 
  Heading,
  useColorModeValue
} from '@chakra-ui/react'

const Data = () => {
  const bgColor = useColorModeValue('white', 'gray.900')
  const textColor = useColorModeValue('black', 'white')

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
              Data
            </Heading>
          </Box>

          {/* Content */}
          <Box>
            <Text 
              fontSize="md"
              color={textColor}
              lineHeight="1.6"
            >
              Coming soon.
            </Text>
          </Box>

        </VStack>
      </Box>
    </Box>
  )
}

export default Data