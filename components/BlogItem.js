import Image from 'next/image';
import Link from 'next/link';

export default function BlogItem({ blogTitle, blogAuthor, blogDate, blogImage, blogContent, blogLink }) {
  return (
    <div className={`bg-slate-300 dark:bg-gray-900 rounded-md shadow-lg overflow-clip`}>
      <img src={blogImage} loading="lazy" alt="Picture of the author" className={`min-w aspect-video object-cover`} />

      <div className={`pb-2 pt-3 px-3 flex flex-col space-y-0.5`}>
        <label className={`text-sm text-opacity-50 dark:text-opacity-50`} suppressHydrationWarning={true}>{new Date(blogDate).toLocaleString()}</label>
        <Link href={`/post/${blogLink}`} className={`text-2xl truncate  font-serif`}>{blogTitle}</Link>
        <label className={`text-sm text-opacity-50 dark:text-opacity-50`}>By {blogAuthor}</label>
      </div>

      <div className={`pb-3 px-3`}>
        <p>{blogContent}</p>
      </div>
    </div>
  )
}