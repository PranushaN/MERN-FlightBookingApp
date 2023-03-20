import React from 'react';
import BasicTabs from './BasicTabs';
import { Categories } from './Categories';
import './home.css';

export const Home = () => {
    const [tab, setTabActive] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue )
    setTabActive(newValue);
  };
  return (
    <>
        <BasicTabs handleTabChange={handleTabChange} activeTab={tab} />
        <Categories tab={tab} />
    </>
  )
}
