import Link from "next/link"

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5 text-sm text-zinc-500 dark:text-zinc-400">
      <div className="flex justify-between max-w-4xl mx-auto">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/blog` : `/blog/page/${currentPage - 1}`} passHref
             >
            <button
              rel="previous"
              className="transform hover:text-zinc-600 hover:dark:text-zinc-300"
            >
              Previous
            </button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`} passHref >
            <button rel="next" className="transform hover:text-zinc-600 hover:dark:text-zinc-300">
              Next
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
