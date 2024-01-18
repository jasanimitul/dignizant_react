import React, { useState, startTransition} from 'react'
import { Container, Stack, TextField, Rating, Autocomplete } from '@mui/material';
import MoviesList from './MoviesList';

const movieData = [
    { id:1, title: 'The Matrix', rating: 7, category: 'Action' },
    { id:2, title: 'Focus', rating: 1, category: 'Comedy' },
    { id:3, title: 'The Lazarus Effect', rating: 6, category: 'Thriller' },
    { id:4, title: 'Everly', rating: 5, category: 'Action' },
    { id:5,  title: 'Maps to the Stars', rating: 7.5, category: 'Drama' },
    { id:6,  title: 'Dangle ', rating: 5, category: 'Drama' },
  ];


export default function Movies() {

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState();

  // Handle movie search
  const handleSearch = (e) => {
    startTransition(() => {
      setSearchTitle(e.target.value)
    })
  }

  // Filter movies by name category and rating
  const filteredMovies = applyFilter({
    movieData,
    searchTitle,
    selectedRatings,
    selectedGenres
  });


  return (
    <div style={{ paddingBottom: '20px' }}>
      <Container maxWidth={false} sx={{py:8}}>
        <Stack spacing={2} direction="row" alignItems="start">
          <Stack sx={{width:'500px'}} spacing={2}>
              <TextField
                fullWidth
                sx={{maxWidth: '650px', background: 'white'}}
                placeholder="Search Movies"
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {(isSearchFocused || searchTitle !== '') &&
                <MoviesList movieData={filteredMovies} />
              }
          </Stack>

          <Autocomplete
            sx={{ width: '200px' }}
            id="ratings"
            limitTags={1}
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            disableCloseOnSelect
            getOptionLabel={(option) => option.toString()} // Convert the rating to a string
            renderTags={(e) => e?.length}
            renderInput={(params) => <TextField {...params} label="Select Ratings" variant="outlined" />}
            renderOption={(props, option, { selected }) => (
              <Stack {...props} sx={{ p: 0.5 }}>
                <Rating readOnly size="small" defaultValue={option} max={10} />
              </Stack>
            )}
            onChange={(e, values) => setSelectedRatings(values)}
          />

          <Autocomplete
            sx={{ width: '250px'}}
            multiple
            id="genres"
            disableCloseOnSelect
            limitTags={1}
            options={Array.from(new Set(movieData.map((item) => item.category)))}
            renderInput={(params) => <TextField {...params} label="Select Genres" placeholder="Multiple selections" variant="outlined" />}
            onChange={(e, values) => setSelectedGenres(values)}
          />
        </Stack>
      </Container>
    </div>
  )
}

function applyFilter({ movieData, searchTitle, selectedGenres, selectedRatings }) {
  const stabilizedThis = movieData.map((el, index) => [el, index]);
  movieData = stabilizedThis.map((el) => el[0]);
  if (searchTitle) {
    movieData = movieData.filter((item) => item.title.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1);
  }

  // Filter by reating
  if (selectedRatings) {
    movieData = movieData.filter((item) => selectedRatings === item.rating);
  }

  // Filter by Catefory
  if (selectedGenres?.length) {
    movieData = movieData.filter((item) => selectedGenres.includes(item.category));
  }

  return movieData;
}
