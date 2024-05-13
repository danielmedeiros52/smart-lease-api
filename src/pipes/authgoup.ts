import { SetMetadata } from '@nestjs/common';

export const AccessGroup = (group: string) => SetMetadata('accessGroup', group);
