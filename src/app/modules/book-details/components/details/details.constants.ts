import { ButtonType } from '@grotem-ui/grotem-ui-lib';

export const DialogTextConstants = {
  delete: 'Oi, bruv. Are you sure you want to delete this book?',
  save: 'Are you sure everything is correct, mate?',
};

export const DetailsConstants = {
  title: 'Title',
  author: 'Author',
  genre: 'Genre',
  date: 'Date',
  description: 'Description',
};

export const GenreConstants: string[] = [
  'romance',
  'fantasy',
  'thriller',
  'detective',
];
export const ButtonTypeConstants: { [key: string]: ButtonType } = {
  save: 'primary',
  delete: 'danger',
};
export const BookDetailedInfoMsg = {
  loading: 'Loading book!',
  error: 'Error occurred while fetching book. Please refresh the page.',
};
