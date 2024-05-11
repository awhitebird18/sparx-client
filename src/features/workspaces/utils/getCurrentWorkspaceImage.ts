import workspaceNight from '@/assets/images/workspaceNight.png';
import workspaceDay from '@/assets/images/workspaceDay.png';

export function getCurrentWorkspaceImage() {
  const hour = new Date().getHours();
  const isDaytime = hour > 6 && hour < 18;

  if (isDaytime) {
    return workspaceDay;
  } else {
    return workspaceNight;
  }
}
