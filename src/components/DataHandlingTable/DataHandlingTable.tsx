import { dataHandling } from "@/lib/content/unical";

/**
 * Renders the shared `dataHandling` rows. Used on both the Unical product
 * page and the privacy policy so the two can never state different things —
 * see the note at the top of `src/lib/content/unical.ts`.
 *
 * Two renders of the same array, swapped at `sm`. A single scrolling table
 * put "Where it lives" off-screen on a phone, and that column carries the
 * claim the page is making ("Never stored") — so below `sm` each row becomes
 * a card instead. Only one of the two is ever displayed, so `display: none`
 * keeps the other out of the accessibility tree rather than reading twice.
 */
export function DataHandlingTable({ caption }: { caption: string }) {
  const headings = ["What", "Why", "Where it lives"];

  return (
    <>
      <ul className="space-y-3 sm:hidden">
        {dataHandling.map((row) => (
          <li
            key={row.what}
            className="border-border bg-card rounded-xl border p-4"
          >
            <p className="text-foreground font-semibold text-pretty">
              {row.what}
            </p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  {headings[1]}
                </dt>
                <dd className="text-muted-foreground mt-0.5 text-pretty">
                  {row.why}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  {headings[2]}
                </dt>
                <dd
                  className={
                    row.emphasis
                      ? "text-foreground mt-0.5 font-medium text-pretty"
                      : "text-muted-foreground mt-0.5 text-pretty"
                  }
                >
                  {row.where}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="border-border bg-card hidden overflow-x-auto rounded-2xl border sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-muted">
              {headings.map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="text-muted-foreground border-border border-b px-4 py-3 font-semibold tracking-wide uppercase"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataHandling.map((row) => (
              <tr
                key={row.what}
                className="border-border border-b last:border-b-0"
              >
                <th
                  scope="row"
                  className="text-foreground px-4 py-4 align-top font-medium text-pretty"
                >
                  {row.what}
                </th>
                <td className="text-muted-foreground px-4 py-4 align-top text-pretty">
                  {row.why}
                </td>
                <td
                  className={
                    row.emphasis
                      ? "text-foreground px-4 py-4 align-top font-medium text-pretty"
                      : "text-muted-foreground px-4 py-4 align-top text-pretty"
                  }
                >
                  {row.where}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
