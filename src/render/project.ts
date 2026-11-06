// project page: typed ProjectData -> markup, one renderer per content type
import type { ProjectContent } from '../types/projectContent/projectContent';
import { ProjectContentType } from '../types/projectContent/projectContentType';
import type { ProjectData } from '../types/projectContent/projectData';
import type { ProjectExternalLink } from '../types/projectContent/projectExternalLink';
import type { ProjectImage } from '../types/projectContent/projectImage';
import type { ProjectImages } from '../types/projectContent/projectImages';
import type { ProjectImageText } from '../types/projectContent/projectImageText';
import type { ProjectList } from '../types/projectContent/projectList';
import type { ProjectMetaData } from '../types/projectContent/projectMetaData';
import type { ProjectText } from '../types/projectContent/projectText';
import { attrs, cls, each, esc, style } from './html';
import { responsiveImg } from './img';

/** the overview filtered to one keyword */
export const keywordHref = (keyword: string) => `/projects/?k=${encodeURIComponent(keyword)}`;

// rendered widths: the hero spans the project layout (--global-max-width), content images are capped in projectImage.css
const mainImageSizes = 'min(100vw, 1200px)';
const contentImageSizes = 'min(100vw, 800px)';
// see .images & .image-grid in projectImage.css
const imagesSizes = 'min(100vw, 800px)';
const imageGridSizes = '(max-width: 650px) 100vw, min(50vw, 600px)';

export const imageLink = (link: NonNullable<ProjectImage['link']>) =>
  `<a${attrs({
    class: 'image-link caption caption--small',
    href: link.href,
    target: '_blank',
    rel: 'noopener noreferrer',
    title: link.title,
    'aria-label': link.title
  })}>↗</a>`;

/** text over an image: `size` small (a black label) or large (the hero title), `pos` e.g. bottom-right */
const caption = (text: string, size: string, pos: string, color?: ProjectImage['imageTextColor']) =>
  `<div${attrs({ class: cls('caption', `caption--${size}`, color === 'black-on-white' && 'caption--dark'), 'data-pos': pos })}>${esc(
    text
  )}</div>`;

export const renderImage = (
  image: ProjectImage,
  { isMainImage = false, maxHeight, maxWidth }: { isMainImage?: boolean; maxHeight?: number; maxWidth?: number } = {}
) => {
  const textPosition = image.imageTextPosition ?? (isMainImage ? 'center' : 'bottom');
  const textAlignment = image.imageTextAlignment ?? (isMainImage ? 'center' : 'right');
  return `<div${attrs({
    class: cls('project-image', isMainImage && 'main-image fade-in'),
    style: style({ maxHeight: image.maxImageHeight ?? maxHeight, maxWidth: image.maxImageWidth ?? maxWidth })
  })}>${responsiveImg(image.picture, {
    sizes: isMainImage ? mainImageSizes : contentImageSizes,
    eager: isMainImage,
    alt: image.imageText ?? ''
  })}${image.link ? imageLink(image.link) : ''}${
    image.imageText
      ? caption(
          image.imageText,
          image.imageTextSize ?? (isMainImage ? 'large' : 'small'),
          `${textPosition}-${textAlignment}`,
          image.imageTextColor
        )
      : ''
  }</div>`;
};

export const renderText = (text: ProjectText) =>
  `<div class="text-block columns-${text.maxColumnCount}">${each(text.content, (c) =>
    Array.isArray(c) ? `<h2>${esc(c[0])}</h2><p>${esc(c[1])}</p>` : `<p>${esc(c)}</p>`
  )}</div>`;

export const renderImageText = (content: ProjectImageText) =>
  `<div class="image-text-block ${content.position ?? 'left'}">${renderImage(content.image, {
    maxHeight: content.maxImageHeight,
    maxWidth: content.maxImageWidth
  })}${renderText(content.text)}</div>`;

export const renderImages = (content: ProjectImages) => {
  const isGrid = content.type === ProjectContentType.ImageGrid;
  const className = isGrid ? 'image-grid' : 'images';
  return `<div class="${className}">${each(
    content.images,
    (image) =>
      `<div class="${className}-content">${responsiveImg(image.picture, {
        sizes: isGrid ? imageGridSizes : imagesSizes,
        alt: image.imageText ?? ''
      })}${image.link ? imageLink(image.link) : ''}${
        image.imageText
          ? caption(
              image.imageText,
              image.imageTextSize ?? 'small',
              `${image.imageTextPosition ?? 'bottom'}-${image.imageTextAlignment ?? 'right'}`
            )
          : ''
      }</div>`
  )}</div>`;
};

export const renderLinks = (links: ProjectExternalLink[]) =>
  `<div class="text-block link-list">${each(
    links,
    ({ description, href, alternativeName }) =>
      `<div>${description ? `<p>${esc(description)}</p>` : ''}<a${attrs({ href })}>${esc(alternativeName ?? href)}</a></div>`
  )}</div>`;

export const renderList = (list: ProjectList) =>
  list.content.length === 0
    ? ''
    : `<div class="link-block">${list.title ? `<h1>${esc(list.title)}</h1>` : ''}${
        list.description ? `<p>${esc(list.description)}</p>` : ''
      }${
        typeof list.content[0] === 'string'
          ? each(list.content as string[], (s) => `<span>${esc(s)}</span>`)
          : each(list.content as [string, string][], ([a, b]) => `<div><span>${esc(a)}</span><span>${esc(b)}</span></div>`)
      }</div>`;

export const renderContent = (content: ProjectContent): string => {
  switch (content.type) {
    case ProjectContentType.Image:
      return renderImage(content);
    case ProjectContentType.Text:
      return renderText(content);
    case ProjectContentType.ImageText:
      return renderImageText(content);
    case ProjectContentType.Images:
    case ProjectContentType.ImageGrid:
      return renderImages(content);
    case ProjectContentType.ExternalLink:
      return renderLinks([content]);
    case ProjectContentType.ExternalLinkList:
      return renderLinks(content.links);
    case ProjectContentType.List:
      return renderList(content);
    default:
      return '';
  }
};

const metaLink = (value: string, className = 'meta-value quiet-link') =>
  `<a${attrs({ class: className, href: keywordHref(value) })}>${esc(value)}</a>`;

const metaItem = (label: string, body: string, className = 'meta-item stack') =>
  `<div class="${className}"><span class="meta-label">${label}</span>${body}</div>`;

export const renderMetaBlock = (m: ProjectMetaData) =>
  `<div class="project-meta-block-left" data-category="${esc(m.projectType)}"><div class="project-meta-block">${[
    metaItem('category', metaLink(m.projectType)),
    metaItem('context', metaLink(m.projectContext)),
    metaItem('collaboration', metaLink(m.projectPartnerContext)),
    m.projectPartners?.length
      ? metaItem('partners', `<div class="meta-partners stack">${each(m.projectPartners, (p) => metaLink(p))}</div>`)
      : '',
    m.client ? metaItem('client', metaLink(m.client)) : '',
    m.keywords?.length
      ? metaItem(
          'keywords',
          `<div class="meta-keywords cluster">${each(m.keywords, (k) => metaLink(String(k), 'tag'))}</div>`,
          'meta-item meta-item--keywords stack'
        )
      : ''
  ].join('')}</div></div>`;

export const renderProject = (project: ProjectData) =>
  `<div class="project-layout">${renderImage(project.projectImage, { isMainImage: true })}${renderMetaBlock(
    project.metaData
  )}<div class="project-content stack fade-in">${each(project.projectContent, renderContent)}</div></div>`;
