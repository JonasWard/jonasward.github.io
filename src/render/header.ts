// the fixed page header, same markup as components/Header.tsx but with real links; the burger toggle is a separate script
import { cls } from './html';

const navLinks = [
  { href: '/projects/', label: 'Projects', active: (path: string) => path.startsWith('/project') },
  { href: '/about/', label: 'About', active: (path: string) => path.startsWith('/about') },
  { href: '/cv/', label: 'CV', active: (path: string) => path.startsWith('/cv') }
];

const burger = `<svg height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M0 5 L30 5" stroke="black" stroke-width="2px"/><path d="M0 15 L30 15" stroke="black" stroke-width="2px"/><path d="M0 25 L30 25" stroke="black" stroke-width="2px"/></svg>`;

/** `path` is the page's own path, `children` goes below the header row (e.g. the keyword filter) */
export const renderHeader = ({ path, logoSrc, children = '' }: { path: string; logoSrc: string; children?: string }) =>
  `<div class="header"><div class="header-content"><a href="${
    path.startsWith('/projects') ? '/' : '/projects/'
  }" class="header-logo"><img alt="" src="${logoSrc}"></a><div class="header-right"><div class="navigation-button show" data-nav-toggle>${burger}</div><div class="dropdown-content">${navLinks
    .map(
      ({ href, label, active }) => `<a class="${cls('button-main', active(path) && 'button-active')}" href="${href}">${label}</a>`
    )
    .join('')}</div></div></div>${children}</div>`;
