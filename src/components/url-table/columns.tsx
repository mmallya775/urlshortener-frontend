import {createColumnHelper} from "@tanstack/react-table";
import type {DataTableFeatures} from "@/components/url-table/data-table-features.ts";
import type {Urls} from "@/types/urlTypes.ts";

const columnHelper = createColumnHelper<DataTableFeatures, Urls>()

export const columns = columnHelper.columns([
  columnHelper.accessor("createdAt", {
    header: "Created At", cell: (info) => {
      const date = new Date(info.getValue());

      const formattedDate = new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZoneName: "short",
      }).format(date);

      return <span>{formattedDate}</span>;
    }
  }),
  columnHelper.accessor("mainUrl", {
    header: "Main Url", cell: (info) => {
      const mainUrl = info.getValue().trim()

      const href = /^https?:\/\//i.test(mainUrl)
        ? mainUrl
        : `https://${mainUrl}`

      return <a href={href} target="_blank" rel="noopener noreferrer"
                className={"text-blue-700 dark:text-blue-400 hover:underline"}>
        {mainUrl}</a>
    }
  }),
  columnHelper.accessor("shortCode", {header: "ShortCode"}),
]);

