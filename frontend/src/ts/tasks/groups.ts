export function getGroupsData(): Array<{ id: number; name: string; color: string }> {
  try {
    return JSON.parse(document.getElementById("task-groups-data")?.textContent ?? "[]");
  } catch {
    return [];
  }
}
