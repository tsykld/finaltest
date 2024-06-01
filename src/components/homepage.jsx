import { useState } from 'react';
import {  Tabs, Tab } from '@nextui-org/react';
import { ThemeSwitcher } from './theme';
import HomePost from './home';
import ProfilePage from './profile';


const HomePage = () => {

  const [selected, setSelected] = useState('home')

  return (
    <div className=''>
      <Tabs
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key='home' title="Home">
          <HomePost />
        </Tab>
        <Tab key="profile" title="Profile">
          <ProfilePage />
        </Tab>
      </Tabs>
          
      <ThemeSwitcher />
    </div>
  );
};

export default HomePage;
