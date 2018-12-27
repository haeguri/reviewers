require('./init');

const { Language } = require('../api/language/languageModel');

const languageList = [
  {label: 'JavaScript', value: 'javascript'},
  {label: 'TypeScript', value: 'typescript'},
  {label: 'HTML', value: 'html'},
  {label: 'CSS', value: 'html'},
  {label: 'LESS', value: 'less'},
  {label: 'SASS', value: 'sass'},
  {label: 'Java', value: 'java'},
  {label: 'C++', value: 'cpp'},
  {label: 'Python', value: 'python'},
  {label: 'Ruby', value: 'ruby'},
  {label: 'Swift', value: 'swift'},
];

languageList.forEach(async (langObj, i) => {
  const language = new Language(langObj);
  console.log(language);
  const result = await language.save();

  if(i === languageList.length-1) {
    process.exit();
  }
});

// process.exit();