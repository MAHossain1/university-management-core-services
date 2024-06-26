export const academicSemesterSearchableFields = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];

export const academicSemesterFilterableFields = [
  'searchTerm',
  'code',
  'startMonth',
  'endMonth',
];

export const academicSemesterTitles: string[] = ['Autumn', 'Summer', 'Fall'];
export const academicSemesterCodes: string[] = ['01', '02', '03'];
export const academicSemesterMonths: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academicSemesterData';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academicSemester.updated';
export const EVENT_ACADEMIC_SEMESTER_DELETE = 'academicSemester.delete';
