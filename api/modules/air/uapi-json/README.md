# Custom modifications in `uapi-json`

## Overview

This project uses the `uapi-json` npm package for interacting with travel port APIs. However, due to some limitations in the original package, custom modifications have been made to the package files. These modifications are stored in the `./api/modules/air/uapi-json/` directory.

To ensure that these custom modifications are applied correctly, you need to copy them to the appropriate directory within the `uapi-json` package whenever you deploy the project either locally or on a server.

## Installation and Setup

1. **Install Dependencies**

   Before copying the modified files, make sure to install all necessary dependencies by running:

   ```bash
   npm install
   ```

2. **Copy Modified Files**

   After installing the dependencies, run the following command to copy the modified files to the `uapi-json` package directory:

   ```bash
   cp -rf ./api/modules/air/uapi-json/* ./node_modules/uapi-json/src/Services/Air/
   ```

   This command will overwrite the original files in the `uapi-json` package with your custom modifications.

3. **Run the Project**

   Once the files have been copied, you can start your project as usual:

   ```bash
   npm start
   ```

## Notes

- **Re-run the Copy Command After npm Install:** If you ever run `npm install` again, the modifications may be lost since `node_modules` can be reset. Be sure to re-run the copy command after installing or updating dependencies.
- **Custom Modifications Location:** All custom modifications are located in the `./api/modules/air/uapi-json/` directory. If you need to make further changes, update the files in this directory.

## Troubleshooting

- If you encounter issues with the `uapi-json` package, ensure that the modified files have been copied correctly to `./node_modules/uapi-json/src/Services/Air/`.
- Double-check that the modifications are compatible with the current version of `uapi-json`.
