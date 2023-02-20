import rss from '@astrojs/rss';
import {formatBlogPosts} from '../js/utils'

export function get(context) {
  const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true }); 
  const posts = formatBlogPosts(Object.values(postImportResult));
  return rss({
    stylesheet: '/rss/styles.xsl',
    title: 'my astro blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: post.frontmatter.publishDate,
      customData: `<author>by ${post.frontmatter.author}</author>`,
    })),
  });
}