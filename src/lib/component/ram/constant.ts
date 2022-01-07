export const RETRYOPTIONS = {
  retries: 5,
  factor: 2,
  minTimeout: 1 * 1000,
  randomize: true,
};

export const HELP = [
  {
    header: 'Ram',
    content: 'Operation ram resource.',
  },
  {
    header: 'Usage',
    content: '$ s deploy/delete <options> ',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'help',
        description: '使用引导',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples',
    content: [
      {
        example: '$ s exec -- deploy',
      },
      {
        example: '$ s exec -- delete',
      },
    ],
  },
];
