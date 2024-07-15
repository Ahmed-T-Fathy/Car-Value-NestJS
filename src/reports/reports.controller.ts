import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create.user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService:ReportsService){}
    
    @Post('/create')
    @UseGuards(AuthGuard)
    createReport(@Body() reportObj:CreateReportDto){
        return this.reportsService.create(reportObj);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    getReport(@Param('id') id:Number){
        return this.reportsService.findById(id);
    }

}
