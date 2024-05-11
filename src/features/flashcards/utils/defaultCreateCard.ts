export const defaultCreateCard = [
  {
    uuid: '1',
    title: 'Front side',
    content: JSON.stringify({
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                text: 'This is a simple Lexical editor paragraph.',
                type: 'text',
                version: 1,
              },
            ],
            format: '',
            type: 'paragraph',
            version: 1,
          },
          {
            children: [
              { detail: 0, mode: 'normal', text: 'sd', type: 'text', version: 1 },
              {
                detail: 0,
                format: 1,
                mode: 'normal',
                text: 'fdsfdsfsdfdsf',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    }),
    onChange: () => {
      console.info('to implement');
    },
    isOpen: true,
  },
  {
    uuid: '2',
    title: 'Back side',
    content: JSON.stringify({
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'This is a simple Lexical editor paragraph.',
                detail: 0,
              },
            ],
            version: 1,
            format: 0,
          },
        ],
        direction: 'ltr',
        format: 0,
        indent: 0,
        type: 'root',
        version: 1,
      },
    }),
    onChange: () => {
      console.info('to implement');
    },
    isOpen: true,
  },
];
