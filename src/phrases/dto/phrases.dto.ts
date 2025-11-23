import { IsOptional, IsString, IsIn } from 'class-validator';
import { VALID_STATUSES } from '../../common/constant';

export class SearchPhraseDto {
    @IsOptional()
    @IsString()
    query?: string;

    @IsOptional()
    @IsString()
    sort?: string; // e.g. 'createdAt', 'updatedAt', 'phrase'

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'asc';

    @IsOptional()
    @IsIn([...VALID_STATUSES])
    status?: string;
}
