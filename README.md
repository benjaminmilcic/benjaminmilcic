```
┌─ BENJAMIN MILČIĆ ─────────────────────────────────────────────
│
│  Freelance Full-Stack Developer · Germany
│  Angular · Ionic · NestJS · 10+ years of shipping
│
│  → auf-zu-neuen-welten.de
│
└───────────────────────────────────────────────────────────────
```

I build web and mobile apps that go into production and stay there.
Frontends with Angular and Ionic, backends with NestJS — from internal
dashboards to Play Store apps with thousands of users.

<br/>

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'benjamin-milcic',
  template: `<router-outlet />`,
})
export class BenjaminMilcic {
  readonly role      = 'Freelance Full-Stack Developer';
  readonly based     = 'Germany';
  readonly since     = 2019;                    // first professional Angular line
  readonly coding    = 'since my teens';        // HTML, CSS, JS, PHP
  readonly speaks    = { de: 'native', en: 'fluent', hr: 'advanced' };
  readonly offDuty   = ['husband', 'father of one'];

  readonly availability = signal<'open' | 'booked'>('open');

  ship(idea: Idea): Observable<Product> {
    return of(idea).pipe(
      map(this.understand),   // what is the actual problem?
      map(this.question),     // requirements are rarely final
      map(this.build),        // typed, componentised, tested
      map(this.maintain),     // still readable in two years
    );
  }
}
```

> Ten years of software development taught me one thing: **code is only half
> the battle.** The other half is understanding the problem, questioning the
> requirements, and delivering something that is still maintainable two years
> from now.

<br/>

## The stack, honestly

|  |  |
|---|---|
| **Every single day** | Angular · TypeScript · Ionic · NestJS · RxJS · NgRx · SCSS |
| **Regularly** | Node.js · Express · MySQL · Firebase · Tailwind · Angular Material · Cypress |
| **When a project asks for it** | Socket.IO · Stripe · Leaflet / MapTiler · Chart.js · Cloudflare Workers · Capacitor / Play Store releases |
| **Where it started** | HTML · CSS · JavaScript · PHP — long before it was a job |

<br/>

## Things I've built in the open

### Auf zu neuen Welten

<a href="https://auf-zu-neuen-welten.de">
  <img src="https://auf-zu-neuen-welten.de/assets/homepage-image.png" width="420" alt="auf-zu-neuen-welten.de"/>
</a>

My homepage, portfolio and permanent construction site. Angular 20 with
standalone components and signals, lazy-loaded everywhere, i18n in German,
English and Croatian, full-text search over the whole site, deployed behind
Cloudflare Workers. Public on purpose — the code is part of the portfolio.

**[Frontend](https://github.com/benjaminmilcic/aznw-routes)** ·
**[NestJS backend](https://github.com/benjaminmilcic/nest-aznw-api)** ·
**[Live](https://auf-zu-neuen-welten.de)**

<br/>

### Vocabulary Trainer

Web and Android app for learning Croatian — one Angular/Ionic codebase,
Firebase behind it. Built because I wanted the thing to exist.

**[Code](https://github.com/benjaminmilcic/learn-croatian)** ·
**[Live](https://learn-croatian-86b00.web.app/)** ·
**[APK](https://raw.githubusercontent.com/benjaminmilcic/learn-croatian/master/apk/learn-croatian.apk)**

<br/>

### Game Collection

A handful of well-known multiplayer games with realtime sync, Angular +
Firebase. Play against someone in another browser.

**[Code](https://github.com/benjaminmilcic/whiteboard)** ·
**[Live](https://whiteboard-32486.web.app/)**

<br/>

## The playground

Every idea I want to try lands in the [gimmicks section](https://auf-zu-neuen-welten.de/gimmicks)
of my site instead of dying in a scratch folder:

`weather maps` &nbsp;·&nbsp; `interactive charts` &nbsp;·&nbsp; `AI image generation (Flux & SDXL)` &nbsp;·&nbsp; `realtime chat`
`recipe manager` &nbsp;·&nbsp; `movie database` &nbsp;·&nbsp; `country explorer` &nbsp;·&nbsp; `calendar` &nbsp;·&nbsp; `guestbook`
`Minesweeper` &nbsp;·&nbsp; `Connect Four` &nbsp;·&nbsp; `Yahtzee` &nbsp;·&nbsp; `jigsaw` &nbsp;·&nbsp; `quizzes`

It doubles as a testbed. If something new shows up in one of my client
projects, chances are it was tried out here first.

<br/>

## Client work

<details>
<summary><b>Four projects I spent real time in</b> — click to expand</summary>

<br/>

**[Solakon](https://www.solakon.de)** — iOS and Android app that integrates
balcony power plants into the home energy network. Angular + Ionic, live on the
[Play Store](https://play.google.com/store/apps/details?id=de.solakon.app).

**[HippoData](https://login.hippodata.de)** — B2B platform for planning and
evaluating show jumping and riding tournaments. Angular, a lot of domain logic,
a lot of edge cases.

**[Webaro](https://webaro.de)** — dashboard for Weber Agrar Robotics: planning
and evaluation of agricultural drone data, with live data streaming in.
Angular.

**[CatchCups](https://catchcups.com)** — mobile app that evaluates measurement
data from lawn irrigation systems. Angular + Ionic, also on the
[Play Store](https://play.google.com/store/apps/details?id=de.codext.catchcup).

</details>

<br/>

## Say hello

Working on something and wondering whether I'm a fit? Tell me the stack, the
timeline and roughly the budget — the more specific, the better. I usually
answer within a day.

| | |
|---|---|
| Mail | [benjamin.milcic@gmail.com](mailto:benjamin.milcic@gmail.com) |
| Web | [auf-zu-neuen-welten.de](https://auf-zu-neuen-welten.de) |
| Stack Overflow | [/users/20271366](https://stackoverflow.com/users/20271366/benjamin) |

<br/>

```
                                        ~ auf zu neuen Welten
```
