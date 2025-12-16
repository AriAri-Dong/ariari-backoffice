import { useQuery } from "@tanstack/react-query"
import { getReportTarget } from "../../apis/report/api"

export const useGetReportTarget = (url: string) => {
  return useQuery({
    queryKey: [...url.split("/")],
    queryFn: () => getReportTarget(url)
  })
}