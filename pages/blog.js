import Navbar from '@/components/Navbar';
import SettingsOverlay from '@/components/SettingsOverlay';
import BlogItem from '@/components/BlogItem';

import showdown from 'showdown';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Blog({ blogData }) {

  return (
    <>
      <Navbar pageData={{ title: 'Blog', active: 'blog', type: 'page' }} />

      <Hero pageType="page" pageData={{ title: 'Blog' }} />

      <main className={`grid grid-cols-3 my-4 max-md:grid-cols-1 max-lg:grid-cols-2 auto-rows-max grid-flow-row gap-4 max-w-5xl lg:mx-auto max-lg:mx-4 lg:px-0`}>
        {blogData.map((blog) => (
          <BlogItem
            blogAuthor={blog.author}
            blogContent={blog.content.replace(/(<([^>]+)>)/gi, "").substring(0, 100).trim() + '...'}
            blogDate={blog.created * 1000}
            blogImage={blog.image}
            blogLink={`${blog.permalink}`}
            blogTitle={blog.title}
          />
        ))}
      </main>

      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const blogFetch = await fetch('https://theclashfruit.me/api/v1/posts')
  const blogData = await blogFetch.json()

  const converter = new showdown.Converter();

  converter.setFlavor('github');

  const finalBlogData = blogData.data.map((blog) => {
    blog.content = converter.makeHtml(blog.content);

    return blog;
  });

  return {
    props: {
      blogData: finalBlogData.reverse(),
    }
  }
}
