import React from 'react';
import fetch from 'cross-fetch';

import { Link, useHistory } from 'react-router-dom';

import searchStyle from './search.module';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    border: '0px solid #e0e0e0',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [showId, setShowid] = React.useState();
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const classes = useStyles();
  const theme = useTheme();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('/api/shows');
      await sleep(1e3); // For demo purposes.
      const shows = await response.json();
      if (active) {
        setOptions(Object.keys(shows).map((key) => shows[key]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const filterOptions = createFilterOptions({
    limit: 5,
    stringify: (option) => option.title,
  });

  return (
    <Autocomplete
      id="search"
      style={{ width: 500, background: 'white' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      filterOptions={filterOptions}
      renderOption={(option) => (
        <>
          <Link to={`/shows/${option.id}`}>
            <Card className={classes.root}>
              <CardMedia className={classes.cover} image={`${option.photo}`} title={option.title} />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="body1">
                    {option.title}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    value={option.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                </CardContent>
              </div>
            </Card>
          </Link>
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for shows or users"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
