import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';
import {
  Button,
  Input,
  Paper,
  TextField,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  Typography
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { $reactBlack, $reactWhite } from '../constants/colors';
import { openFile, writeToFile } from "../helpers/fileParsers";

const theme = createMuiTheme({
  palette: {
    primary: { main: $reactWhite }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    },
    border: `1px solid ${$reactWhite}`,
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    overflow: 'hidden',
    color: $reactWhite,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&$focused': {
      borderColor: theme.palette.primary.main
    }
  },
  focused: {},
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3)
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    '& + $fieldContainer': {
      marginTop: theme.spacing(3)
    }
  },
  fileParserContainer: {
    alignItems: 'center',
    backgroundColor: $reactBlack,
    color: $reactWhite,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    height: '100%',
    justifyContent: 'flex-start',
    margin: 0,
    width: 'auto'
  },
  createContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(3)
  }
}));

export default function FileParser() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [type, setType] = useState('CSV');
  const [number, setNumber] = useState(3);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!isEmpty(text) && !isNaN(number) && number > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [text, type, number]);

  const handleChange = e => {
    setType(e.target.value);
  };

  const handleNumberChange = e => {
    const { value } = e.target;
    if (!isNaN(value)) {
      setNumber(value);
    }
  };

  return (
    <div className={classes.fileParserContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h3" component="h2" align="center">
          File Parser
        </Typography>
        <div className={classes.fieldContainer}>
          <p>Where is the file located?</p>
          <Input
            inputProps={{ accept: 'text/plain' }}
            type="file"
            onChange={e => openFile(e, setText)}
          />
        </div>
        <FormControl component="fieldset" className={classes.fieldContainer}>
          <FormLabel component="legend">
            Is the file format CSV (comma-separated values) or TSV
            (tab-separated values)?
          </FormLabel>
          <RadioGroup
            aria-label="file-format"
            name="fileFormat"
            value={type}
            onChange={handleChange}
            className={classes.radioContainer}
          >
            <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
            <FormControlLabel value="TSV" control={<Radio />} label="TSV" />
          </RadioGroup>
        </FormControl>
        <div className={classes.fieldContainer}>
          <TextField
            fullWidth
            label="How many fields should each record contain?"
            id="numberOfFieldsText"
            onChange={handleNumberChange}
            value={number}
          />
        </div>
        <div className={classes.createContainer}>
          <Button
            color="primary"
            disabled={isDisabled}
            variant="contained"
            onClick={() => writeToFile(text, type, number)}
          >
            Create Records
          </Button>
        </div>
      </Paper>
    </div>
  );
}
