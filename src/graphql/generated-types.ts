export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type AuthorInput = {
  __typename?: 'AuthorInput';
  name: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  isbn: Scalars['ID'];
  title: Scalars['String'];
};

export type BookInput = {
  __typename?: 'BookInput';
  authorId: Scalars['ID'];
  isbn: Scalars['ID'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: Author;
  createBook: Book;
};


export type MutationCreateAuthorArgs = {
  input: AuthorInput;
};


export type MutationCreateBookArgs = {
  input: BookInput;
};

export type Query = {
  __typename?: 'Query';
  author: Author;
  authors?: Maybe<Array<Author>>;
  book: Book;
  books?: Maybe<Array<Book>>;
};


export type QueryAuthorArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryBookArgs = {
  isbn?: InputMaybe<Scalars['ID']>;
};
