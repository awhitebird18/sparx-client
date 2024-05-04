import {
  Bell,
  BellFill,
  ChatSquareDots,
  ChatSquareDotsFill,
  CheckSquare,
  CheckSquareFill,
  FileText,
  FileTextFill,
  People,
  PeopleFill,
  StarFill,
  Star,
  Collection,
  CollectionFill,
  Icon,
  Magic,
} from 'react-bootstrap-icons';
import { SidePanelComponent } from '../sidePanel/componentList';

const navItems: {
  type: SidePanelComponent;
  icon: Icon | (({ size }: { size?: number }) => JSX.Element);
  iconFilled: Icon | (({ size }: { size?: number }) => JSX.Element);
  tooltip: string;
}[] = [
  { type: 'assistant', icon: Magic, iconFilled: Magic, tooltip: 'AI Assistant' },
  { type: 'notes', icon: FileText, iconFilled: FileTextFill, tooltip: 'Notes' },
  { type: 'flashcards', icon: Collection, iconFilled: CollectionFill, tooltip: 'Flashcards' },
  { type: 'stats', icon: Star, iconFilled: StarFill, tooltip: 'Stats' },
  { type: 'tasks', icon: CheckSquare, iconFilled: CheckSquareFill, tooltip: 'Tasks' },
  { type: 'users', icon: People, iconFilled: PeopleFill, tooltip: 'Users' },
  {
    type: 'activity',
    icon: Bell,
    iconFilled: BellFill,
    tooltip: 'Activity',
  },
  {
    type: 'discussions',
    icon: ChatSquareDots,
    iconFilled: ChatSquareDotsFill,
    tooltip: 'Discussions',
  },
];

export default navItems;
