import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import logo from '@/assets/images/logo.svg';
import { LEGAL_DOCS, type LegalClause, getLegalDoc } from '@/constants/legal';
import { cn } from '@/lib/cn';

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps<'/legal/[slug]'>): Promise<Metadata> {
  const doc = getLegalDoc((await params).slug);
  return { title: doc ? `${doc.label} | 당당` : '당당' };
}

function ClauseBlock({ clause, id }: { clause: LegalClause; id: string }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-grey-100 py-8 md:py-10">
      <h2 className="text-lg font-bold text-ink md:text-xl">{clause.title}</h2>
      {clause.lines && (
        <div className="mt-4 flex flex-col gap-2 text-[15px] leading-[1.8] text-grey-700">
          {clause.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
      {clause.rows && (
        <table className="mt-5 w-full border-collapse overflow-hidden rounded-2xl text-left text-sm md:text-[15px]">
          {clause.head && (
            <thead>
              <tr className="bg-grey-100 text-grey-700">
                <th className="w-[34%] px-4 py-3 font-semibold md:w-[28%]">{clause.head[0]}</th>
                <th className="px-4 py-3 font-semibold">{clause.head[1]}</th>
              </tr>
            </thead>
          )}
          <tbody>
            {clause.rows.map((row) => (
              <tr
                key={row.label}
                className={cn(
                  'border-b border-grey-100 last:border-none',
                  row.highlight && 'bg-yellow-50'
                )}
              >
                <th
                  scope="row"
                  className="w-[34%] bg-grey-50 px-4 py-3.5 align-top font-semibold text-grey-800 md:w-[28%]"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3.5 leading-[1.7] text-grey-700">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {clause.note && <p className="mt-3 text-[13px] leading-[1.6] text-grey-500">{clause.note}</p>}
      {clause.link && (
        <Link
          href={`/legal/${clause.link.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-yellow-600 underline-offset-4 hover:underline"
        >
          {clause.link.label} ›
        </Link>
      )}
    </section>
  );
}

/** 약관·개인정보 처리방침 (토스 privacy-policies처럼 홈페이지 안 문서 페이지) */
export default async function LegalPage({ params }: PageProps<'/legal/[slug]'>) {
  const doc = getLegalDoc((await params).slug);
  if (!doc) notFound();

  return (
    <div className="min-h-svh bg-white">
      <header className="sticky top-0 z-30 border-b border-grey-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-gutter">
          <Link href="/" className="flex items-center gap-2" aria-label="당당 홈으로">
            <Image src={logo} alt="" width={30} height={30} />
            <span className="text-lg font-bold text-ink">당당</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-grey-600 hover:text-ink">
            홈으로
          </Link>
        </div>
        <nav aria-label="약관 문서" className="mx-auto max-w-content px-5 md:px-gutter lg:hidden">
          <ul className="-mb-px flex [scrollbar-width:none] gap-5 overflow-x-auto [mask-image:linear-gradient(to_right,#000_85%,transparent)] pr-8">
            {LEGAL_DOCS.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/legal/${item.slug}`}
                  aria-current={item.slug === doc.slug ? 'page' : undefined}
                  className={cn(
                    'block border-b-2 py-3 text-sm font-semibold whitespace-nowrap',
                    item.slug === doc.slug
                      ? 'border-ink text-ink'
                      : 'border-transparent text-grey-500'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mx-auto flex max-w-content gap-16 px-5 pt-10 pb-24 md:px-gutter md:pt-16">
        <aside className="hidden w-[220px] shrink-0 lg:block">
          <div className="sticky top-28 flex flex-col gap-8">
            <ul className="flex flex-col gap-1">
              {LEGAL_DOCS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/legal/${item.slug}`}
                    aria-current={item.slug === doc.slug ? 'page' : undefined}
                    className={cn(
                      'block rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors',
                      item.slug === doc.slug
                        ? 'bg-yellow-50 text-yellow-600'
                        : 'text-grey-600 hover:bg-grey-50'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {doc.clauses.length > 1 && (
              <nav aria-label="조항 목차">
                <p className="px-3 text-xs font-semibold text-grey-400">목차</p>
                <ol className="mt-2 flex flex-col">
                  {doc.clauses.map((clause, i) => (
                    <li key={clause.title}>
                      <a
                        href={`#clause-${i + 1}`}
                        className="block rounded-lg px-3 py-1.5 text-[13px] leading-[1.5] text-grey-500 hover:text-ink"
                      >
                        {clause.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        </aside>

        <article className="min-w-0 flex-1">
          <h1 className="text-[28px] leading-[1.35] font-bold text-ink md:text-[40px]">
            {doc.title}
          </h1>
          {doc.version && <p className="mt-3 text-sm text-grey-500">{doc.version}</p>}
          {doc.intro && (
            <p className="mt-6 text-[15px] leading-[1.8] text-grey-700 md:text-base">{doc.intro}</p>
          )}

          {doc.callout && (
            <section className="mt-8 rounded-3xl bg-yellow-50 p-6">
              <h2 className="text-base font-bold text-ink md:text-lg">⚠︎ {doc.callout.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.75] text-grey-800">{doc.callout.body}</p>
            </section>
          )}

          {doc.summary && (
            <section className="mt-10">
              <h2 className="text-lg font-bold text-ink md:text-xl">한눈에 보기</h2>
              <ul className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
                {doc.summary.map((item) => {
                  const body = (
                    <>
                      <span className="text-sm font-bold text-ink md:text-[15px]">
                        {item.title}
                      </span>
                      <span className="text-[13px] leading-[1.55] text-grey-600">{item.body}</span>
                    </>
                  );
                  const cls =
                    'flex h-full flex-col gap-1.5 rounded-2xl bg-grey-50 p-4 transition-colors';
                  return (
                    <li key={item.title}>
                      {item.link ? (
                        <Link
                          href={`/legal/${item.link}`}
                          className={cn(cls, 'hover:bg-yellow-50')}
                        >
                          {body}
                          <span className="mt-auto pt-1 text-xs font-semibold text-yellow-600">
                            자세히 ›
                          </span>
                        </Link>
                      ) : (
                        <div className={cls}>{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="mt-10">
            {doc.clauses.map((clause, i) => (
              <ClauseBlock key={clause.title} clause={clause} id={`clause-${i + 1}`} />
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
