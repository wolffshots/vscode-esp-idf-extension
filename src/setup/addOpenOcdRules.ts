/*
 * Project: ESP-IDF VSCode Extension
 * File Created: Thursday, 15th July 2021 4:20:36 pm
 * Copyright 2021 Espressif Systems (Shanghai) CO LTD
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { copyFile, pathExists } from "fs-extra";
import { dirname, join } from "path";
import { appendIdfAndToolsToPath } from "../utils";

export async function copyOpenOcdRules() {
  if (process.platform !== "linux") {
    throw new Error("This is not a Linux machine.");
  }
  const modifiedEnv = appendIdfAndToolsToPath();
  if (!modifiedEnv.OPENOCD_SCRIPTS) {
    throw new Error("OPENOCD_SCRIPTS environment variables is not defined");
  }
  const openOCDRulesPath = join(dirname(modifiedEnv.OPENOCD_SCRIPTS), "contrib", "60-openocd.rules");
  const doesRulesPathExists = await pathExists(openOCDRulesPath);
  if (!doesRulesPathExists) {
    throw new Error(`${openOCDRulesPath} doesn't exists.`);
    
  }
  await copyFile(openOCDRulesPath, "/etc/udev/rules.d/");
}
