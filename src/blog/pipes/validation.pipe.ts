import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ApiTokenCheckMiddleware implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {}
}
