// the html cv (components/cv/CVDigital.tsx and its renderers) as one string, the printed / pdf version is the same
// markup with a print stylesheet, so there is no separate react-pdf document anymore
import type { CVData, Education, Experience, ExperienceContent, Info, List, ListContent, Skills } from '../types/cv/cvType';
import { esc, style } from './html';

type Style = Record<string, string | number>;

// the values of components/cv/style.ts, which the html cv used as inline styles
export const CV_STYLES = {
  block: { display: 'flex', flexDirection: 'column', width: '100%' },
  blockLeft: { display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'right' },
  section: { display: 'flex', flexDirection: 'row' },
  primaryItem: { padding: 0, fontSize: 14, fontWeight: 400 },
  secondaryItem: { marginTop: '3.5px', padding: 0, fontSize: 9.5, fontWeight: 400 },
  secondaryItemLeft: { marginTop: '3.5px', padding: 0, fontSize: 9.5, fontWeight: 400, textAlign: 'right' },
  regularItem: { margin: 0, padding: 0, fontSize: 9, fontWeight: 200, textAlign: 'left', color: '#333333' },
  regularItemBold: { margin: 0, padding: 0, fontSize: 9, fontWeight: 400, textAlign: 'left', color: '#000000' },
  mainItemTitle: { margin: '2px 0px', padding: 0, fontSize: 30, fontWeight: 800, textAlign: 'left' },
  mainItemTitleRight: { margin: '2px 0px', padding: 0, fontSize: 30, fontWeight: 800, textAlign: 'right' },
  skillsInsetLeft: { margin: 0, padding: 0, fontSize: 9, fontWeight: 200, textAlign: 'right' },
  tagTitle: { fontSize: 14, fontWeight: 600 }
} satisfies Record<string, Style>;
const S = CV_STYLES;

const div = (s: Style | undefined, body: string, id?: string) =>
  `<div${id ? ` id="${esc(id)}"` : ''}${s ? ` style="${style(s)}"` : ''}>${body}</div>`;

const text = (content: string, s: Style = S.regularItem, href?: string) =>
  div(s, `${esc(content)}${href ? ` - <a href="${esc(href)}">link</a>` : ''}`);

const space = (height: number | string, id = 'divider') => div({ height }, '', id);
const dividingSpace = (id?: string) => space(3, id);
const dividingLine = (paddingTop = 7) =>
  space(paddingTop, 'aboveLine') + div({ height: '0.5px', backgroundColor: '#999999' }, '', 'line') + space(7, 'underneathLine');

const title = (t: string, leftAlign = true) =>
  text(t, leftAlign ? S.mainItemTitle : S.mainItemTitleRight) +
  space(10, '') +
  div({ height: 4, backgroundColor: '#000000' }, '') +
  space(10, '');

const listContent = (content: ListContent, s?: Style) => text(Array.isArray(content) ? content.join(', ') : content, s);

const namedList = (data: List) =>
  div(
    undefined,
    Object.entries(data)
      .map(([t, content]) => {
        const actual = Array.isArray(content) ? content[1] : content;
        const link = Array.isArray(content) ? content[0] : undefined;
        return div(undefined, text(t, S.secondaryItem, link) + text(`${actual}`, S.regularItem));
      })
      .join(''),
    'NamedListRenderer'
  );

export const renderInfo = (info: Info) =>
  div(
    S.block,
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
    S.blockLeft,
    title('Education') +
      education
        .map((e, i) =>
          div(
            undefined,
            div({ ...S.section, textAlign: 'left' }, text(`${e.name} `, S.primaryItem) + text(`- ${e.place}`, S.secondaryItem), 'name') +
              div(S.regularItem, text(`${e.date} - ${e.description}`)) +
              dividingSpace(),
            String(i)
          )
        )
        .join(''),
    'education'
  );

export const renderSkills = (skills: Skills) =>
  div(
    S.blockLeft,
    title('Skills', false) +
      skills
        .map(({ header, subSkills }, i, all) =>
          div(
            { breakInside: 'avoid' },
            text(`${header} `, S.primaryItem) +
              Object.entries(subSkills)
                // the html cv never showed skillSubTitle's margins (react-pdf's View rendered as an inline element)
                .map(([parent, list]) => div(undefined, text(parent, S.secondaryItemLeft) + listContent(list, S.skillsInsetLeft)))
                .join('') +
              (i < all.length - 1 ? dividingLine(12) : '')
          )
        )
        .join(''),
    'skills'
  );

const experienceContent = (c: ExperienceContent, endLine: boolean) =>
  div(
    { breakInside: 'avoid' },
    div(S.section, text(`${c.company} `, S.primaryItem) + text(` - ${c.location} - ${c.date}`, S.secondaryItem), 'name') +
      text(`${c.position} - ${c.role}`, { ...S.regularItemBold, marginTop: 4, marginBottom: 1 }) +
      namedList(c.projects) +
      (endLine ? dividingLine() : '')
  );

export const renderExperience = (experiences: Experience) =>
  div(
    S.block,
    title('Experience') + [...experiences].reverse().map((e, i, all) => experienceContent(e, i < all.length - 1)).join(''),
    'experience'
  );

export const renderExtraCurricular = (data: List) =>
  div({ ...S.block, breakInside: 'avoid' }, title('Extra Curricular') + namedList(data), 'extra-curricular');

export type CVAssets = { profileImage: string; logo: string; printer: string; qrCode: string };

/** `route` is the cv's route as printed on paper (`jonasward.ch/#<route>`), `pdfHref` the pre-built pdf of the page */
export const renderCV = (
  data: CVData,
  { assets, route, pdfHref, pdfName, createdOn }: { assets: CVAssets; route: string; pdfHref: string; pdfName: string; createdOn: Date },
  customTitle?: string
) =>
  `<div class="cv-content"><a class="cv-download" href="${esc(pdfHref)}" download="${esc(pdfName)}"><div class="cv-download-link"><img src="${
    assets.printer
  }" alt=""><span>Download</span></div></a><div><div id="header"><div id="left" class="header-grid"><div class="header-grid div-1"><img style="width:120px;height:120px;border-radius:60px" alt="red-dot" src="${
    assets.profileImage
  }"></div><div class="header-grid div-2"><img style="width:100%;height:75%" alt="red-dot" src="${assets.logo}"><div>${text(
    customTitle ?? data.tagline[0],
    S.tagTitle
  )}${data.tagline
    .slice(1)
    .map((t) => text(t))
    .join('')}</div></div></div></div><div id="section 1" class="content-grid">${renderInfo(data.info)}${renderEducation(
    data.education
  )}${renderSkills(data.skills)}<div>${renderExperience(data.experience)}<div style="height:20px;width:100%"></div>${renderExtraCurricular(
    data.extraCurricular
  )}</div></div></div><div class="cv-print-footer">Created on ${createdOn.getFullYear()}.${
    createdOn.getMonth() + 1
  }.${createdOn.getDate()}. <a href="https://jonasward.ch/#${esc(route)}">jonasward.ch/#${esc(route)}</a><img src="${
    assets.qrCode
  }" alt=""></div></div>`;
