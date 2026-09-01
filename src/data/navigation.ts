export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'stack', label: 'Stack', index: '02' },
  { id: 'experience', label: 'Experience', index: '03' },
  { id: 'work', label: 'Work', index: '04' },
  { id: 'background', label: 'Background', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
];
