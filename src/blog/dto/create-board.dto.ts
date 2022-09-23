export class CreateBoardDto {
  readonly title: string;

  readonly description: string;

  readonly body: string;

  readonly author: string;
}

export class CreateBoardResponse {
  id: string;
}
