import {
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    Text
} from '@chakra-ui/react';
import { FramerButton } from './index';

export const FilterMenuCmp: React.FC = () => {
    return (
        <Menu closeOnSelect={false} >
            <MenuButton
                w={'full'}
                boxShadow={'sm'}
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
