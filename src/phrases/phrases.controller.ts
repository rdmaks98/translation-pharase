import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PhraseService } from './phrases.service';
import { SearchPhraseDto } from './dto/phrases.dto';

@Controller('phrase')
export class PhraseController {
    constructor(private readonly phraseService: PhraseService) { }

    // Search endpoint
    @Get('search')
    async search(@Query() dto: SearchPhraseDto) {
        try {
            const results = await this.phraseService.search(dto);
            return {
                status: 200,
                message: 'Search results retrieved successfully',
                data: results,
            };
        } catch (error: any) {
            return {
                status: error.status || 500,
                message: error.message || 'Something went wrong',
                data: null,
            };
        }
    }

    // Get translation
    @Get(':id/:lang')
    async getTranslation(
        @Param('id', ParseIntPipe) id: number,
        @Param('lang') lang: string,
    ) {
        try {
            const translation = await this.phraseService.findTranslation(id, lang);
            return {
                status: 200,
                message: 'Translation retrieved successfully',
                data: translation,
            };
        } catch (error: any) {
            return {
                status: error.status || 500,
                message: error.message || 'Something went wrong',
                data: null,
            };
        }
    }

    // Get phrase by ID
    @Get(':id')
    async getPhrase(@Param('id', ParseIntPipe) id: number) {
        try {
            const phrase = await this.phraseService.findById(id);
            return {
                status: 200,
                message: 'Phrase retrieved successfully',
                data: phrase,
            };
        } catch (error: any) {
            return {
                status: error.status || 500,
                message: error.message || 'Something went wrong',
                data: null,
            };
        }
    }
}
