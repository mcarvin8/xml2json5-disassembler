# `xml2json5-disassembler`

[![NPM](https://img.shields.io/npm/v/xml2json5-disassembler.svg?label=xml2json5-disassembler)](https://www.npmjs.com/package/xml2json5-disassembler) [![Downloads/week](https://img.shields.io/npm/dw/xml2json5-disassembler.svg)](https://npmjs.org/package/xml2json5-disassembler)

> DEPRECATION WARNING: This package is deprecated in favor of the latest [`xml-disassembler`](https://github.com/mcarvin8/xml-disassembler) package, which can now handle disassembling XML files into smaller JSON5 files, as well as other file formats like YAML and JSON. Please migrate to the latest [`xml-disassembler`](https://github.com/mcarvin8/xml-disassembler).

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
  - [XML to JSON5](#xml-to-json5)
  - [JSON5 to XML](#json5-to-xml)
- [Example](#example)
- [Ignore File](#ignore-file)
- [Logging](#logging)
- [Contributing](#contributing)
- [Template](#template)
</details>

## Background

Transforms large XML files into smaller JSON5 files, a more flexible JSON format that allows comments and trailing commas, making it more developer-friendly. Supports reassembly into XML when required.

This is an extension of [`xml-disassembler`](https://github.com/mcarvin8/xml-disassembler).

## Install

Install the package using NPM:

```
npm install xml2json5-disassembler
```

## Usage

### XML to JSON5

Disassemble then transform 1 or multiple XML files into JSON5 files.

```typescript
/* 
FLAGS
- filePath:         Relative path to 1 XML file or a directory of XML files to disassemble into JSON5 files.
- uniqueIdElements: Comma-separated list of unique and required ID elements used to name disassembled files for nested elements. 
                    Defaults to SHA-256 hash if unique ID elements are undefined or not found.
- prePurge:         Delete pre-existing disassembled directories prior to disassembling the file.
- postPurge:        Delete the original XML file after disassembling it.

- ignorePath:       Path to an disassembly ignore file.
*/
import { XmlToJson5Disassembler } from "xml2json5-disassembler";

const handler = new XmlToJson5Disassembler();
await handler.disassemble({
  filePath: "test/baselines/general",
  uniqueIdElements:
    "application,apexClass,name,externalDataSource,flow,object,apexPage,recordType,tab,field",
  prePurge: true,
  postPurge: true,
  ignorePath: ".xmldisassemblerignore",
});
```

### JSON5 to XML

Reassemble the disassembled JSON5 directory into 1 XML file.

```typescript
/* 
FLAGS
- filePath:        Relative path to the disassembled JSON5 directory to reassemble as an XML file.
- fileExtension:   File extension for the reassembled XML.
                   (default: `.xml`)
- postPurge:       Delete the disassembled directory after reassembly.
*/
import { Json5ToXmlReassembler } from "xml2json5-disassembler";

const handler = new Json5ToXmlReassembler();
await handler.reassemble({
  filePath: "test/baselines/HR_Admin",
  fileExtension: "permissionset-meta.xml",
  postPurge: true,
});
```

## Example

**XML file (`HR_Admin.permissionset-meta.xml`)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<PermissionSet xmlns="http://soap.sforce.com/2006/04/metadata">
    <applicationVisibilities>
        <application>JobApps__Recruiting</application>
        <visible>true</visible>
    </applicationVisibilities>
    <classAccesses>
        <apexClass>Send_Email_Confirmation</apexClass>
        <enabled>true</enabled>
    </classAccesses>
    <fieldPermissions>
        <editable>true</editable>
        <field>Job_Request__c.Salary__c</field>
        <readable>true</readable>
    </fieldPermissions>
    <description>Grants all rights needed for an HR administrator to manage employees.</description>
    <label>HR Administration</label>
    <userLicense>Salesforce</userLicense>
    <objectPermissions>
        <allowCreate>true</allowCreate>
        <allowDelete>true</allowDelete>
        <allowEdit>true</allowEdit>
        <allowRead>true</allowRead>
        <viewAllRecords>true</viewAllRecords>
        <modifyAllRecords>true</modifyAllRecords>
        <object>Job_Request__c</object>
    </objectPermissions>
    <pageAccesses>
        <apexPage>Job_Request_Web_Form</apexPage>
        <enabled>true</enabled>
    </pageAccesses>
    <recordTypeVisibilities>
        <recordType>Recruiting.DevManager</recordType>
        <visible>true</visible>
    </recordTypeVisibilities>
    <tabSettings>
        <tab>Job_Request__c</tab>
        <visibility>Available</visibility>
    </tabSettings>
    <userPermissions>
        <enabled>true</enabled>
        <name>APIEnabled</name>
    </userPermissions>
</PermissionSet>
```

**Disassembled JSON5 Files**

<img src="https://raw.githubusercontent.com/mcarvin8/xml2json5-disassembler/main/.github/images/disassembled.png">
<p><em>Disassembled JSON5 files using unique ID elements</em></p>
<br>

<img src="https://raw.githubusercontent.com/mcarvin8/xml2json5-disassembler/main/.github/images/disassembled-hashes.png">
<p><em>Disassembled JSON5 files using SHA-256 hashes</em></p>

## Ignore File

Reference [ignore file](https://github.com/mcarvin8/xml-disassembler#ignore-file) section from `xml-disassembler`.

## Logging

Reference [logging](https://github.com/mcarvin8/xml-disassembler#logging) section from `xml-disassembler`.

Import the `setLogLevel` function from `xml2json5-disassembler` to change the logging state.

```typescript
import {
  XmlToJson5Disassembler,
  Json5ToXmlReassembler,
  setLogLevel,
} from "xml2json5-disassembler";

setLogLevel("debug");
```

## Contributing

Contributions are welcome! See [Contributing](https://github.com/mcarvin8/xml2json5-disassembler/blob/main/CONTRIBUTING.md).

## Template

This project was created from a template by [Allan Oricil](https://github.com/AllanOricil).

His original [license](https://github.com/AllanOricil/js-template/blob/main/LICENSE) remains in this project.
