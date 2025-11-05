export const today = new Date();
export const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);
export const sevenDaysAfter = new Date();
sevenDaysAfter.setDate(today.getDate() + 7);

function formatDateToDot(
  dateString?: string,
  withSpace: boolean = true,
  shortYear: boolean = false,
): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const year = shortYear ? String(date.getFullYear()).slice(2) : String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const separator = withSpace ? '. ' : '.';

  return `${year}${separator}${month}${separator}${day}`;
}

export default formatDateToDot;

export const formatDateToHyphen = (d: Date | null) => {
  if (!d) return '';
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
};
