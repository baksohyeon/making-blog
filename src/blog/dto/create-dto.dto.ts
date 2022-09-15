// /blog/dto/create-dto.dto.ts

export class CreatePostDTO {
  readonly title: string;

  readonly description: string;

  readonly body: string;

  readonly author: string;

  readonly date_posted: string;
}
