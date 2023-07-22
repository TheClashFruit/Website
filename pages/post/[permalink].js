import Navbar from '@/components/Navbar';
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight'
import Hero from '@/components/Hero';
import SettingsOverlay from '@/components/SettingsOverlay';

export default function Post({ postData }) {

  return (
    <>
      <Navbar pageData={{ title: postData.title, active: 'post', type: 'post', postData }} />

      <Hero pageType="post" pageData={{ title: postData.title, author: postData.author }} />

      <article className={`prose my-4 dark:prose-invert max-w-5xl lg:mx-auto max-lg:px-4 lg:px-0`} dangerouslySetInnerHTML={{ __html: postData.content }} />
    </>
  )
}

export async function getServerSideProps(context) {

  const postFetch = await fetch(`https://theclashfruit.me/api/v1/post/${context.params.permalink}`)
  const postData = await postFetch.json()

  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true,
        auto_detection: true
      })
    ]
  });

  converter.setFlavor('github');

  postData.content = converter.makeHtml(postData.content);

  console.log(postData)

  return {
    props: {
      postData,
    }
  }
}