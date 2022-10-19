export interface GetBoardResponseInterface {
  id: string;

  slug: string;

  title: string;

  description: string;

  body: string;

  username: string;

  createdAt: Date;

  updatedAt: Date;

  tagList: string[];

  favoritesCount: number;
}
