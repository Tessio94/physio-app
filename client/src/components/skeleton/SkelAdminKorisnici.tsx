import { Skeleton } from "../ui/skeleton";

const SkelAdminKorisnici = ({ withSearch = true }) => {
  return (
    <div className="w-full">
      {/* Search bar skeleton */}
      {withSearch && (
        <div className="flex items-center py-4">
          <Skeleton className="h-9 w-64 rounded-md" />
        </div>
      )}

      {/* Table container */}
      <div className="rounded-t-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/40">
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i} className="p-3 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <td key={colIndex} className="p-3">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkelAdminKorisnici;
