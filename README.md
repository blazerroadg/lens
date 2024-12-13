


```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobShiftHours } from './job-shift-hours.entity';

@Injectable()
export class JobShiftHoursService {
  constructor(
    @InjectRepository(JobShiftHours)
    private readonly jobShiftHoursRepository: Repository<JobShiftHours>,
  ) {}

  // Save multiple records
  async save(jobShiftHoursList: Partial<JobShiftHours[]>): Promise<JobShiftHours[]> {
    // Create the records
    const records = this.jobShiftHoursRepository.create(jobShiftHoursList);

    // Save all records in bulk
    return await this.jobShiftHoursRepository.save(records);
  }
}


import { Controller, Post, Body } from '@nestjs/common';
import { JobShiftHoursService } from './job-shift-hours.service';
import { JobShiftHours } from './job-shift-hours.entity';

@Controller('job-shift-hours')
export class JobShiftHoursController {
  constructor(private readonly service: JobShiftHoursService) {}

  @Post('/bulk-save')
  async save(
    @Body() jobShiftHoursList: Partial<JobShiftHours[]>,
  ): Promise<JobShiftHours[]> {
    return this.service.save(jobShiftHoursList);
  }
}



import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobShiftHours } from './job-shift-hours.entity';

@Injectable()
export class JobShiftHoursService {
  constructor(
    @InjectRepository(JobShiftHours)
    private readonly jobShiftHoursRepository: Repository<JobShiftHours>,
  ) {}

  // Bulk update for a list of JobShiftHours
  async bulkUpdate(jobShiftHoursList: Partial<JobShiftHours[]>): Promise<JobShiftHours[]> {
    const updatedRecords: JobShiftHours[] = [];

    for (const jobShiftHours of jobShiftHoursList) {
      if (!jobShiftHours.id) {
        throw new Error(`Missing id for one of the records`);
      }

      // Find the existing record
      const existingRecord = await this.jobShiftHoursRepository.findOneBy({ id: jobShiftHours.id });
      if (!existingRecord) {
        throw new Error(`Record with id ${jobShiftHours.id} not found`);
      }

      // Merge new data into the existing record
      const updatedRecord = this.jobShiftHoursRepository.merge(existingRecord, jobShiftHours);
      // Save the updated record
      updatedRecords.push(await this.jobShiftHoursRepository.save(updatedRecord));
    }

    return updatedRecords;
  }
}


import { Controller, Put, Body } from '@nestjs/common';
import { JobShiftHoursService } from './job-shift-hours.service';
import { JobShiftHours } from './job-shift-hours.entity';

@Controller('job-shift-hours')
export class JobShiftHoursController {
  constructor(private readonly service: JobShiftHoursService) {}

  @Put('/bulk-update')
  async bulkUpdate(
    @Body() jobShiftHoursList: Partial<JobShiftHours[]>,
  ): Promise<JobShiftHours[]> {
    return this.service.bulkUpdate(jobShiftHoursList);
  }
}




```


# Getting Started with Create React App

# LIVE DEMO
https://lens-20b4b.web.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
z
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
