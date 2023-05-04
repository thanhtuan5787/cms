import React, { useState, useEffect, useRef } from "react";
import DragDropComponent from '../index'
import ApiConfig from '../../app/api.json'

import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon,
} from '@mantine/core';

import {
	MantineProvider,
	ColorSchemeProvider,
} from '@mantine/core';
import { Edit, Eye, Trash } from 'tabler-icons-react';
import { useLocalStorage } from '@mantine/hooks';
import PageService from '../Services/page.service';
const Home = () => {
  const [pages, setPages] = useState([]);
  const [editPage, setEditPage] = useState([]);
  const [edit, setEdit] = useState(false);
  const [opened, setOpened] = useState(false);
  const pageName = useRef('');
	const [colorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});
  useEffect(() => {
    PageService.getAllPages().then(
      (response) => {
        setPages(response.data);
      },
      (error) => {
      }
    );
  }, []);

  function createPage() {
    let page = {name: pageName.current.value}
    PageService.createPage(page).then(
      (response) => {
        setPages([...pages, page]);
      },
      (error) => {
      }
    );
  }
  function onSaveCallback(content){
      editPage.content = content;
      PageService.editPage(editPage).then(
        (response) => {
          setPages(pages);
        },
        (error) => {
        }
      );
      setPages(pages);
  }
  function onCloseCallback(content){
    setEdit(false);
  }

  function deletePage(name) {
    PageService.deletePage(name).then(
      (response) => {
        PageService.getAllPages().then(
          (response) => {
            setPages(response.data);
          },
          (error) => {
          }
        );      },
      (error) => {
      }
    );
  }
  return (
    <>
    {!edit && (<ColorSchemeProvider
			colorScheme={colorScheme}>
			<MantineProvider
				theme={{ colorScheme, defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>
					<Modal
						opened={opened}
						size={'md'}
						title={'New Page'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
						}}
						centered>
						<TextInput
							mt={'md'}
							ref={pageName}
							placeholder={'Page Name'}
							required
							label={'Name'}
						/>
						
						<Group mt={'md'} position={'apart'}>
							<Button
								onClick={() => {
									setOpened(false);
								}}
								variant={'subtle'}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									createPage();
									setOpened(false);
								}}>
								Create Page
							</Button>
						</Group>
					</Modal>
					<Container size={550} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 900,
								})}>
								Created Pages
							</Title>
						
						</Group>
						{pages.length > 0 ? (
							pages.map((page, index) => {
								if (page.name) {
									return (
										<Card withBorder key={index} mt={'sm'}>
											<Group position={'apart'}>
												<Text weight={'bold'}>{page.name}</Text>
                        <ActionIcon
													onClick={() => {
														setEdit(true);
                            setEditPage(page);
													}}
													color={'blue'}
													variant={'transparent'}>
													<Edit />
												</ActionIcon>
                        <ActionIcon
													onClick={() => {
														window.open(ApiConfig.consumer_base_url + page.name, '_blank');
													}}
													color={'blue'}
													variant={'transparent'}>
													<Eye />
												</ActionIcon>
												<ActionIcon
													onClick={() => {
														deletePage(page.name);
													}}
													color={'red'}
													variant={'transparent'}>
													<Trash />
												</ActionIcon>
                        
											</Group>
										
										</Card>
									);
								}
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no tasks
							</Text>
						)}
						<Button
							onClick={() => {
								setOpened(true);
							}}
							fullWidth
							mt={'md'}>
							New Page
						</Button>
					</Container>
				</div>
			</MantineProvider>
		</ColorSchemeProvider>)}
    {edit && (<div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        alignItems: 'center'
      }}
    >
      <DragDropComponent initialState={editPage.content} saveCallback={onSaveCallback} closedCallback={onCloseCallback}/>
    </div>)}
    </>
  );
};

export default Home;
