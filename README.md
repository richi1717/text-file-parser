### Text File Parser

This is a very basic app that you select a file to process a delimited text. The file will
have a header row, then one row per record. The records may be comma-separated or
tab-separated. An example file’s contents could be:

```text
First Name,Middle Name,Last Name
Jane,Taylor,Doe
Chris,Lee
Jose,,Morro
```

The application should ask the user 3 questions:

```
Where is the file located?
Is the file format CSV (comma-separated values) or TSV (tab-separated values)?
How many fields should each record contain?
```

The application should then produce two output files. One file will contain the records
(if any) with the correct number of fields. The second will contain the records
(if any) with the incorrect number of fields. Neither file should contain the
header row. If there are no records for a given output file, do not create the file.
Based on the above sample input, if the user specified a CSV file with 3 fields per record,
the following files would be created:

Correctly formatted records:

```text
// correctlyFormattedRecords.txt
Jane,Taylor,Doe
Jose,,Morro
```

Incorrectly formatted records:

```text
// incorrectlyFormattedRecords.txt
Chris,Lee
```

#### Install

Requires a node version of 8.0.0 - 9.0.0 as I've only tested on that version.

```bash
$ git clone git@github.com:richi1717/text-file-parser.git
$ yarn
$ yarn dev:app
```

Then navigate to [http://0.0.0.0:8080/](http://0.0.0.0:8080/)

#### Notes

I used the setup from my other project,
[https://github.com/richi1717/portfolio](https://github.com/richi1717/portfolio),
to save time and so that I could focus on the actual logic/meat of the project. Some of
the design/setup decisions I made in the other project bled into this one. This ended
up being a lot of fun trying to figure out the best path to take. I initially started
with just a bash script but then thought having some ui would be nice. I know React and node
so I decided to use them to accomplish these tasks.
