```
CREATE TABLE YourTableName (
    wrks_id INT NULL,
    wrks_work_date DATETIME NULL,   -- Assuming this is a full date and time value
    wrks_start_time DATETIME NULL,
    wrks_end_time DATETIME NULL,
    wrks_manual_calc VARCHAR(255) NULL,   -- Assuming 255 max length for strings
    emp_id INT NULL,
    shft_id INT NULL,
    calcgrp_id INT NULL,
    wrks_authorized VARCHAR(255) NULL,
    wrks_auth_by VARCHAR(255) NULL,
    wrks_auth_date DATETIME NULL,
    wrks_error_status VARCHAR(255) NULL,
    wrks_flag_brk VARCHAR(255) NULL,
    wrks_flag_recall VARCHAR(255) NULL,
    wrks_flag1 VARCHAR(255) NULL,
    wrks_flag2 VARCHAR(255) NULL,
    wrks_flag3 VARCHAR(255) NULL,
    wrks_flag4 VARCHAR(255) NULL,
    wrks_flag5 VARCHAR(255) NULL,
    wrks_udf1 VARCHAR(255) NULL,
    wrks_udf2 VARCHAR(255) NULL,
    wrks_udf3 VARCHAR(255) NULL,
    wrks_udf4 VARCHAR(255) NULL,
    wrks_udf5 VARCHAR(255) NULL,
    wrks_udf6 VARCHAR(255) NULL,
    wrks_udf7 VARCHAR(255) NULL,
    wrks_udf8 VARCHAR(255) NULL,
    wrks_udf9 VARCHAR(255) NULL,
    wrks_udf10 VARCHAR(255) NULL,
    wrks_desc VARCHAR(255) NULL,
    wrks_comments VARCHAR(255) NULL,
    wrks_clocks VARCHAR(255) NULL,
    wrks_error VARCHAR(255) NULL,
    wrks_rules_applied VARCHAR(255) NULL,
    paygrp_id INT NULL,
    wrks_tcode_sum VARCHAR(255) NULL,
    wrks_htype_sum VARCHAR(255) NULL,
    wrks_orig_clocks VARCHAR(255) NULL,
    wrks_messages VARCHAR(255) NULL,
    wrks_in_code VARCHAR(255) NULL,
    wrks_out_code VARCHAR(255) NULL,
    wrks_full_day_code VARCHAR(255) NULL,
    wrks_full_day_minutes INT NULL,
    wrks_submitted VARCHAR(255) NULL,
    wrks_use_def_settings VARCHAR(255) NULL,
    wrks_wrkd_auth VARCHAR(255) NULL,
    client_id INT NULL,
    petyp_id INT NULL,
    eaststs_id INT NULL,
    wrks_clks_authorized VARCHAR(255) NULL,
    data_date DATE NULL  -- Assuming this is just a date without time
);



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
