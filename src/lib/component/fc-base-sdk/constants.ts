export const REMOVE_HELP_INFO = [
  {
    header: 'Remove resources',
    content: 'Specify RESOURCE to remove it and resource belonging to it.\n' +
  'If service is specified, service and its functions should be removed.\n' +
  'If function is specified, function and its triggers should be removed.\n' +
  'If trigger is specified, you can specify the trigger name to remove the specific trigger or remove all triggers without name.\n' },
  {
    header: 'Options',
    optionList: [
      {
        name: 'trigger-name',
        description: 'Resource name to be removed, only for trigger/domain resource.',
        type: String,
      },
      {
        name: 'help',
        description: 'Help for rm.',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  // {
  //   header: 'Global Options',
  //   optionList: [
  //     {
  //       name: 'assumeYes',
  //       description: 'Assume that the answer to any question which would be asked is yes.',
  //       alias: 'y',
  //       type: Boolean,
  //     },
  //   ],
  // },
  {
    header: 'Examples',
    content: [
      '$ remove {bold remove} {underline service}',
      '$ remove {bold remove} {underline function}',
      '$ remove {bold remove} {underline trigger} [{bold --name} {underline name}]',
    ],
  },
];
