'use client';

import Link from "next/link"
import moment from "moment";
import sitemetadata, { siteRepo } from "../../data/sitemetadata"


export default function Footer() {

  return (
    <footer>
      <div className="container flex flex-col items-center px-8 py-8 mx-auto sm:flex-row select-none">
        <div className="text-sm text-zinc-500 dark:text-zinc-300">© {moment().format('YYYY')} {sitemetadata.publishName}</div>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-300 sm:ml-4 sm:pl-4 sm:border-l sm:border-zinc-200 sm:mt-0 select-none">
          Powered by <Link href="https://nextjs.org/" target="_blank">Next.js</Link> and{' '}
          <Link href="https://vercel.com/" target="_blank">Vercel</Link>
        </p>

        <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
          <span className="text-zinc-400 hover:text-zinc-500 transform duration-400">
            <span className="sr-only">Twitter</span>
            <Link href={`https://twitter.com/${sitemetadata.twitter}`} aria-label="Twitter" target="_blank" >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </Link>
          </span>

          <span className="text-zinc-400 hover:text-zinc-500 transform duration-400">
            <span className="sr-only">GitHub</span>
            <Link
              href={`https://www.github.com/${sitemetadata.github}/${siteRepo}`}
              aria-label="Github"
              target="_blank"
              
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </span>
          <span className="text-zinc-400 hover:text-zinc-500 transform duration-400">
            <span className="sr-only">email</span>
            <Link href= {`mailto:${sitemetadata.email}`} aria-label="Email" target="_blank" >
              <svg
                className="fill-current w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z"
                ></path>
                <path
                  d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </span>
          <span className="text-zinc-400 hover:text-zinc-500 transform duration-400">
          <Link href="/rss" aria-label="RSS" target="_blank" >
                <svg
                  className="fill-current w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 800 800"
                  aria-hidden="true"
                >
                  <path
                    d="M493 652H392c0-134-111-244-244-244V307c189 0 345 156 345 345zm71 0c0-228-188-416-416-416V132c285 0 520 235 520 520z"
                    clipRule="evenodd"
                  />
                  <circle cx="219" cy="581" r="71" />
                </svg>
                </Link>
              </span>
        </span>
      </div>
    </footer>
  );
}
