import { IsLatitude, IsLongitude, IsNumber, IsString, MAX, Max, Min } from "class-validator";

export class CreateReportDto{
    
    @IsNumber()
    @Min(0)    
    @Max(1000000)    
    price:string;

    @IsString()
    make:string

    @IsString()
    model:string

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year:string

    @IsLongitude()
    lng:string

    @IsLatitude()
    lat:string
    
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage:string
}