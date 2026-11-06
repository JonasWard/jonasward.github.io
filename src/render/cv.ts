// the html cv (components/cv/CVDigital.tsx and its renderers) as one string, the printed / pdf version is the same
// markup with a print stylesheet, so there is no separate react-pdf document anymore
import type { CVData, Education, Experience, ExperienceContent, Info, List, ListContent, Skills } from '../types/cv/cvType';
import { attrs, cls, esc } from './html';

// the react-pdf style objects of components/cv/style.ts as classes of src/styles/components/cv.css
const C = {
  block: 'stack',
  blockEnd: 'stack cv-text-end',
  row: 'cv-row',
  primary: 'cv-primary',
  secondary: 'cv-secondary',
  secondaryEnd: 'cv-secondary cv-text-end',
  regular: 'cv-regular',
  title: 'cv-title',
  titleEnd: 'cv-title cv-text-end',
  skillList: 'cv-skill-list',
  taglineTitle: 'cv-tagline-title'
};

const div = (className: string | undefined, body: string, id?: string) =>
  `<div${attrs({ id, class: className })}>${body}</div>`;

const text = (content: string, className = C.regular, href?: string) =>
  div(className, `${esc(content)}${href ? ` - <a href="${esc(href)}">link</a>` : ''}`);

/** an empty spacer, `size` picks one of the .cv-space heights (s 8px, m 12px, l 20px; default 4px) */
const space = (size?: 's' | 'm' | 'l', id: string | undefined = 'divider') =>
  div(cls('cv-space', size && `cv-space--${size}`), '', id || undefined);
const dividingSpace = (id?: string) => space(undefined, id);
const dividingLine = (paddingTop: 's' | 'm' = 's') =>
  space(paddingTop, 'aboveLine') + div('cv-line', '', 'line') + space('s', 'underneathLine');

const title = (t: string, leftAlign = true) =>
  text(t, leftAlign ? C.title : C.titleEnd) + space('s', '') + div('cv-rule', '') + space('s', '');

const listContent = (content: ListContent, className?: string) =>
  text(Array.isArray(content) ? content.join(', ') : content, className);

const namedList = (data: List) =>
  div(
    undefined,
    Object.entries(data)
      .map(([t, content]) => {
        const actual = Array.isArray(content) ? content[1] : content;
        const link = Array.isArray(content) ? content[0] : undefined;
        return div(undefined, text(t, C.secondary, link) + text(`${actual}`, C.regular));
      })
      .join(''),
    'NamedListRenderer'
  );

export const renderInfo = (info: Info) =>
  div(
    C.block,
    title('Info', false) +
      text(`${info.firstName}, ${info.name}`) +
      text(info.titles) +
      (info.placeOfBirth && info.dateOfBirth ? text(`°${info.placeOfBirth}, ${info.dateOfBirth}`) : '') +
      text(info.citizenship) +
      dividingSpace('1') +
      text(info.addressLine1) +
      text(info.telephone) +
      text(info.email) +
      dividingSpace('2') +
      text(info.website[1], undefined, info.website[0]) +
      text(info.github[1], undefined, info.github[0]) +
      text(info.linkedin[1], undefined, info.linkedin[0]),
    'info'
  );

export const renderEducation = (education: Education) =>
  div(
    C.blockEnd,
    title('Education') +
      education
        .map((e, i) =>
          div(
            undefined,
            div(`${C.row} cv-text-start`, text(`${e.name} `, C.primary) + text(`- ${e.place}`, C.secondary), 'name') +
              div(C.regular, text(`${e.date} - ${e.description}`)) +
              dividingSpace(),
            String(i)
          )
        )
        .join(''),
    'education'
  );

export const renderSkills = (skills: Skills) =>
  div(
    C.blockEnd,
    title('Skills', false) +
      skills
        .map(({ header, subSkills }, i, all) =>
          div(
            'cv-keep',
            text(`${header} `, C.primary) +
              Object.entries(subSkills)
                // the html cv never showed skillSubTitle's margins (react-pdf's View rendered as an inline element)
                .map(([parent, list]) => div(undefined, text(parent, C.secondaryEnd) + listContent(list, C.skillList)))
                .join('') +
              (i < all.length - 1 ? dividingLine('m') : '')
          )
        )
        .join(''),
    'skills'
  );

const experienceContent = (c: ExperienceContent, endLine: boolean) =>
  div(
    'cv-keep',
    div(C.row, text(`${c.company} `, C.primary) + text(` - ${c.location} - ${c.date}`, C.secondary), 'name') +
      text(`${c.position} - ${c.role}`, 'cv-regular-bold cv-position') +
      namedList(c.projects) +
      (endLine ? dividingLine() : '')
  );

export const renderExperience = (experiences: Experience) =>
  div(
    C.block,
    title('Experience') + [...experiences].reverse().map((e, i, all) => experienceContent(e, i < all.length - 1)).join(''),
    'experience'
  );

export const renderExtraCurricular = (data: List) =>
  div(`${C.block} cv-keep`, title('Extra Curricular') + namedList(data), 'extra-curricular');

export type CVAssets = { profileImage: string; logo: string; printer: string; qrCode: string };

/** `route` is the cv's route as printed on paper (`jonasward.ch/#<route>`), `pdfHref` the pre-built pdf of the page */
export const renderCV = (
  data: CVData,
  { assets, route, pdfHref, pdfName, createdOn }: { assets: CVAssets; route: string; pdfHref: string; pdfName: string; createdOn: Date },
  customTitle?: string
) =>
  `<div class="cv-content"><a class="cv-download" href="${esc(pdfHref)}" download="${esc(pdfName)}"><div class="cv-download-link"><img src="${
    assets.printer
  }" alt=""><span>Download</span></div></a><div><div id="header"><div id="left" class="cv-header"><div class="cv-header-photo"><img class="cv-profile" alt="red-dot" src="${
    assets.profileImage
  }"></div><div class="cv-header-title stack"><img class="cv-logo" alt="red-dot" src="${assets.logo}"><div>${text(
    customTitle ?? data.tagline[0],
    C.taglineTitle
  )}${data.tagline
    .slice(1)
    .map((t) => text(t))
    .join('')}</div></div></div></div><div id="section 1" class="cv-grid">${renderInfo(data.info)}${renderEducation(
    data.education
  )}${renderSkills(data.skills)}<div>${renderExperience(data.experience)}${space('l', '')}${renderExtraCurricular(
    data.extraCurricular
  )}</div></div></div><div class="cv-print-footer">Created on ${createdOn.getFullYear()}.${
    createdOn.getMonth() + 1
  }.${createdOn.getDate()}. <a href="https://jonasward.ch/#${esc(route)}">jonasward.ch/#${esc(route)}</a><img src="${
    assets.qrCode
  }" alt=""></div></div>`;
