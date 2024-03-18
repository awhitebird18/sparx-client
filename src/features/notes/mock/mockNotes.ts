import { Note } from '../types/Note';

export const mockNotes: Note[] = [
  {
    id: 'a307d71d-5faa-4a0c-b436-81fa6b2a8a44',
    title: 'Note 1',
    content:
      '{"root": {"children": [{"type": "paragraph", "children": [{"type": "text", "text": "Sample text for note content.", "detail": 0}], "version": 1, "format": 0}], "direction": "ltr", "format": 0, "indent": 0, "type": "root", "version": 1}}',
    createdBy: 'User1',
    createdOn: new Date('2023-12-24'),
    lastAccessed: new Date('2023-12-24'),
  },
  {
    id: 'c96d758b-b6b3-489f-a695-83d6c5089657',
    title: 'Note 2',
    content:
      '{"root": {"children": [{"type": "paragraph", "children": [{"type": "text", "text": "Sample text for note content.", "detail": 0}], "version": 1, "format": 0}], "direction": "ltr", "format": 0, "indent": 0, "type": "root", "version": 1}}',
    createdBy: 'User2',
    createdOn: new Date('2023-12-23'),
    lastAccessed: new Date('2023-12-22'),
  },
  {
    id: '3017a5c6-54b2-4b7b-9a37-54f0e5da8215',
    title: 'Note 3',
    content:
      '{"root": {"children": [{"type": "paragraph", "children": [{"type": "text", "text": "Sample text for note content.", "detail": 0}], "version": 1, "format": 0}], "direction": "ltr", "format": 0, "indent": 0, "type": "root", "version": 1}}',
    createdBy: 'User3',
    createdOn: new Date('2023-12-22'),
    lastAccessed: new Date('2023-12-20'),
  },
  {
    id: '36344cb8-2d8a-42dc-af56-3d66df5e3276',
    title: 'Note 4',
    content:
      '{"root": {"children": [{"type": "paragraph", "children": [{"type": "text", "text": "Sample text for note content.", "detail": 0}], "version": 1, "format": 0}], "direction": "ltr", "format": 0, "indent": 0, "type": "root", "version": 1}}',
    createdBy: 'User4',
    createdOn: new Date('2023-12-21'),
    lastAccessed: new Date('2023-12-18'),
  },
  {
    id: '13feadbd-b295-4b12-848f-9f1d89b46b2d',
    title: 'Note 5',
    content:
      '{"root": {"children": [{"type": "paragraph", "children": [{"type": "text", "text": "Sample text for note content.", "detail": 0}], "version": 1, "format": 0}], "direction": "ltr", "format": 0, "indent": 0, "type": "root", "version": 1}}',
    createdBy: 'User5',
    createdOn: new Date('2023-12-20'),
    lastAccessed: new Date('2023-12-16'),
  },
];
