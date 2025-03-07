"use strict";

import { readdir, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path/posix";
import { parseXML } from "xml-disassembler";
import { stringify } from "json5";

import { logger } from "@src/index";

export async function transform2JSON5(xmlPath: string): Promise<void> {
  const subFiles = await readdir(xmlPath);
  for (const subFile of subFiles) {
    const subFilePath = join(xmlPath, subFile);
    if ((await stat(subFilePath)).isDirectory()) {
      await transform2JSON5(subFilePath);
    } else if (
      (await stat(subFilePath)).isFile() &&
      subFilePath.endsWith(".xml")
    ) {
      await writeJSON5(subFilePath);
      await rm(subFilePath);
    }
  }
}

async function writeJSON5(xmlPath: string): Promise<void> {
  const parsedXml = await parseXML(xmlPath);
  const jsonString = stringify(parsedXml, null, 2);
  const jsonPath = xmlPath.replace(/\.xml$/, ".json5");
  await writeFile(jsonPath, jsonString);
  logger.debug(`${xmlPath} has been transformed into ${jsonPath}`);
}
