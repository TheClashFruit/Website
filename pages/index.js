import Navbar from '@/components/Navbar';
import Meta from '@/components/Meta';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import Footer from '@/components/Footer';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';

import {
  SiYoutube,
  SiForgejo,
  SiModrinth,
  SiGithub,
  SiDiscord,
  SiMastodon,
  SiCurseforge,
  SiJavascript,
  SiKotlin,
  SiRust,
  SiHtml5,
  SiCss3,
  SiCsharp,
  SiPython,
  SiFigma,
  SiDavinciresolve
} from '@icons-pack/react-simple-icons';

import {
  ArrowDown,
  Forward
} from 'lucide-react';

import styles from '@/styles/Home.module.scss';

export default function Home() {
  let skills = [
    {
      key: 'html',
      icon: SiHtml5,
      name: 'HTML',
      percent: 100
    },
    {
      key: 'css',
      icon: SiCss3,
      name: 'CSS',
      percent: 98
    },
    {
      key: 'js',
      icon: SiJavascript,
      name: 'JavaScript',
      percent: 99
    },
    {
      key: 'kt',
      icon: SiKotlin,
      name: 'Kotlin',
      percent: 77
    },
    {
      key: 'rs',
      icon: SiRust,
      name: 'Rust',
      percent: 34
    },
    {
      key: 'cs',
      icon: SiCsharp,
      name: 'C#',
      percent: 78
    },
    {
      key: 'py',
      icon: SiPython,
      name: 'Python',
      percent: 69
    },
    {
      key: 'fg',
      icon: SiFigma,
      name: 'Figma',
      percent: 76
    },
    {
      key: 'dr',
      icon: SiDavinciresolve,
      name: 'DaVinci Resolve',
      percent: 12
    }
  ];

  skills.sort((a, b) => b.percent - a.percent);

  return (
    <>
      <Meta pageData={{ title: 'Home', type: 'page' }} />
      <Navbar page="home" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroTop}>
            <h1>TheClashFruit</h1>
            <p>A full-stack web, mobile developer & mod creator.</p>

            <ul className={styles.socialIcons}>
              <li>
                <Button href="https://youtube.com/@TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiYoutube} type="icon" title="YouTube"/>
              </li>
              <li>
                <Button href="https://discord.gg/CWEApqJ6rc" target="_blank" rel="noopener noreferrer me" icon={SiDiscord} type="icon" title="Discord"/>
              </li>
              <li>
                <Button href="https://mas.to/@TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiMastodon} type="icon" title="Mastodon"/>
              </li>
              <li>
                <Button href="https://modrinth.com/user/TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiModrinth} type="icon" title="Modrinth"/>
              </li>
              <li>
                <Button href="https://www.curseforge.com/members/theclashfruit" target="_blank" rel="noopener noreferrer me" icon={SiCurseforge} type="icon" title="CurseForge"/>
              </li>
              <li>
                <Button href="https://git.theclashfruit.me/TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiForgejo} type="icon" title="Forgejo"/>
              </li>
              <li>
                <Button href="https://github.com/TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiGithub} type="icon" title="GitHub" />
              </li>
            </ul>
          </div>

          <Button href="#skills" icon={ArrowDown} type="icon" title="Scroll Down" />
        </div>
      </header>

      <main>
        <div className={styles.container}>
          <div id="skills">
            <h2>Skills</h2>

            <div className={styles.skillsGrid}>
              {skills.map(skill => (
                <Card className={styles.skillCard} key={skill.key}>
                  <skill.icon size={48}/>
                  <div className={styles.skillInner}>
                    <div className={styles.skillLabel}>
                      <h3>{skill.name}</h3>
                      <label>{skill.percent}%</label>
                    </div>
                    <ProgressBar progress={skill.percent}/>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div id="lorem">
            <h2>Lorem Ipsum</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet corporis culpa cupiditate deleniti
              deserunt eligendi iusto modi nulla, obcaecati odit officia provident repudiandae sed sequi sit suscipit,
              ullam velit.
            </p>
          </div>
        </div>
      </main>

      <Footer/>
    </>
  );
}
