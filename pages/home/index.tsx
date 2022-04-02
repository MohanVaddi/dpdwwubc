import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import {
    Button,
    ButtonProps,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    Text,
    MenuDivider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { Layout } from '../../components/UI/Layout';
import { StarIcon } from '@chakra-ui/icons/';
import { MdLocationSearching } from 'react-icons/md';

const FramerButton = motion<ButtonProps>(Button);

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords);
    });
};

const Home: NextPage = () => {
    return (
        <Layout>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                <FramerButton
                    variant={'outline'}
                    leftIcon={<MdLocationSearching />}
                    onClick={getCurrentLocation}>
                    Get Location
                </FramerButton>
                <MenuComp />
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Search2Icon color='gray.300' />}
                    />
                    <Input
                        _focus={{
                            borderColor: 'black',
                        }}
                        type='text'
                        placeholder='Search'
                    />
                </InputGroup>
            </Stack>
        </Layout>
    );
};

const MenuComp: React.FC = () => {
    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={FramerButton}
                p={4}
                rightIcon={<Text />}
                variant='outline'
                fontSize={'sm'}>
                Profession
            </MenuButton>
            <MenuList minWidth='240px'>
                {/* <MenuOptionGroup defaultValue='asc' title='Order' type='radio'>
                    <MenuItemOption value='asc'>Ascending</MenuItemOption>
                    <MenuItemOption value='desc'>Descending</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider /> */}
                <MenuOptionGroup title='Profession' type='checkbox'>
                    <MenuItemOption value='email'>Email</MenuItemOption>
                    <MenuItemOption value='phone'>Phone</MenuItemOption>
                    <MenuItemOption value='country'>Country</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};

export default Home;
