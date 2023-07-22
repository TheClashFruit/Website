import Navbar from '@/components/Navbar';
import { Head } from 'next/document';
import SettingsOverlay from '@/components/SettingsOverlay';
import Hero from '@/components/Hero';
import Main from '@/components/Main';

export default function Home() {
  // Hi! I'm TheClashFruit, I like to make websites, discord bots and more related to programming.

  return (
    <>
      <Navbar pageTitle="Home" activePage="home" />
      <SettingsOverlay />

      <Hero pageType="page" pageData={{ title: 'Home' }} />

      <Main>
        <p>Home</p>
      </Main>
    </>
  )
}
