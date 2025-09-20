export const formatDeadlineDate = (dateString: string): string => {
  if (!dateString) return "마감일 미정";

  try {
    const date = new Date(dateString);

    // Invalid date check
    if (isNaN(date.getTime())) {
      return "마감일 미정";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일`;
  } catch (error) {
    return "마감일 미정";
  }
};