import { 
  Box, 
  Link, 
  Stack, 
  useColorModeValue,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation()
  
  const bg = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('black', 'white')
  const linkColor = useColorModeValue('blue.700', 'blue.400')

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Data', path: '/data' },
    { name: 'Collaborate', path: '/collaborate' },
    { name: 'News', path: '/news' },
  ]

  const isActivePage = (path: string) => location.pathname === path

  return (
    <Box
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      w="100%"
      py={4}
      px={8}
    >
      {/* Desktop Navigation */}
      <Stack 
        direction="row" 
        spacing={8}
        display={{ base: 'none', md: 'flex' }}
        align="flex-start"
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            as={RouterLink}
            to={item.path}
            fontSize="md"
            fontWeight="400"
            color={isActivePage(item.path) ? linkColor : textColor}
            textDecoration={isActivePage(item.path) ? "underline" : "none"}
            _hover={{ 
              textDecoration: "underline"
            }}
          >
            {item.name}
          </Link>
        ))}
      </Stack>

      {/* Mobile menu button */}
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        variant="ghost"
        display={{ base: 'flex', md: 'none' }}
        color={textColor}
        size="sm"
      />

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={16}>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  onClick={onClose}
                  fontSize="md"
                  fontWeight="400"
                  color={isActivePage(item.path) ? linkColor : textColor}
                  textDecoration={isActivePage(item.path) ? "underline" : "none"}
                  _hover={{ 
                    textDecoration: "underline"
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar