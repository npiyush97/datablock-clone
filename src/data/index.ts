export const CSVData = [
  // {
  //   text: 'annual-enterprise-survey-2021.csv',
  // },
  {
    text: 'Sales-Records.csv'
  },
  {
    text: 'bankloan.csv'
  },
  {
    text: 'color_srgb.csv'
  },
  {
    text: 'currency.csv'
  },

  {
    text: 'state_us.csv'
  }
];

export const FilterConditions = {
  number: [
    { text: 'number equals' },
    { text: 'number is greater than' },
    { text: 'number is greater than or equals' },
    { text: 'number is less than' },
    { text: 'number is less than or equals' }
  ],
  string: [
    { text: 'text is exactly' },
    { text: 'text is not exactly' },
    { text: 'text includes' },
    { text: 'text does not includes' }
  ]
};

export const MapConditions = {
  number: [
    { text: 'addition' },
    { text: 'subtraction' },
    { text: 'division' },
    { text: 'multiplication' },
    { text: 'round numbers to the nearest integer' },
    { text: 'round down' },
    { text: 'round up' }
  ],
  string: [
    { text: 'change to uppercase' },
    { text: 'change to lowercase' },
    { text: 'concatinate the string' },
    { text: 'trim' }
  ]
};

export const blocksLibrary = [
  {
    title: 'Input',
    blocks: [
      {
        title: 'File',
        type: 'fileNode',
        desc: 'Handles csv files.',
        input: 'Dataset (csv file)',
        output: 'Dataset, csv or json'
      }
    ]
  },
  {
    title: 'Transforms',
    blocks: [
      {
        title: 'Filter',
        type: 'filterNode',
        desc: 'Filter a dataset based on a given column and condition',
        input: 'Dataset',
        output: 'Dataset'
      },
      {
        title: 'Sort',
        type: 'sortNode',
        desc: 'Sort dataset based on a given column.',
        input: 'Dataset',
        output: 'Dataset'
      },
      {
        title: 'Slice',
        type: 'sliceNode',
        desc: 'Slice a dataset based on indices.',
        input: 'Dataset',
        output: 'Dataset'
      },
      {
        title: 'Find',
        type: 'findNode',
        desc: 'Find first occurance of value in given column of dataset.',
        input: 'Dataset',
        output: 'Dataset'
      },
      {
        title: 'Map',
        type: 'mapNode',
        desc: 'Modify or transform dataset values based on mapping rules.',
        input: 'Dataset',
        output: 'Dataset'
      }
    ]
  }
];

export const ROWS_PER_SCROLL = 200;
