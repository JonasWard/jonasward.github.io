export type MotivationLetterContent = {
  title: string;
  intro: string;
  people: string;
  content: string;
  outro: string;
  wishes: string;
  city: string;
};

export enum MotivationLetterKeys {
  lastKeyMotivationLetter = 'motivationLetterLastKey',
  motivationLetterPreviousData = 'motivationLetterPreviousData',
  defaultKey = 'defaultKey'
}

export type MotivationLetterLocalStorage = Record<string, MotivationLetterContent>;
