import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create.user.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly _repo:Repository<Report>){}

    create(reportDto:CreateReportDto){
        const report=this._repo.create(reportDto);
        return this._repo.save(report);
    }

    findById(id:Number){
        return this._repo.findOneBy({id});
    }
}
