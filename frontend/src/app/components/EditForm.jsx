'use client';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import CategoryComponent from './categoryComponent';
import TagHandler from './tagComponent';
import { useRouter } from 'next/navigation';
import deleteHandler from './utils/deleteHandler';

const EditForm = (props) => {
  const router = useRouter();

  const [asset, setAsset] = useState(props.asset_name);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [teams, setTeams] = useState(props.teams);
  const [tags, setTags] = useState(props.tags);
  const [types, setTypes] = useState(props.types);
  const [loading, setLoading] = useState(false);
  const [isDelete,setIsDelete] = useState(false);
  const [error,setError] = useState('')

  const deleteHelper = async () => {
    setLoading(true);
    const {response,error}=await deleteHandler(props.id);
    setLoading(false);
    if(response === 'Success'){
      router.push('/');
    }
    else{
      console.log(error);
      setError(error);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:8000/resources`, {
        id:props.id,
        asset_name: asset,
        description: description,
        category: category,
        tags: tags,
        teams: teams,
        types: types,
      });
      if (res.status === 200) {
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  if(isDelete){
    return <div className="m-auto text-center bg-white">
      <h3 className="text-xl p-3">Do you want to delete <span className='font-bold'>{asset}</span> </h3>
      <div className='flex flex-row  gap-2'>
        <Button
          variant="contained"
          className=""
          fullWidth
          type="button"
          onClick={()=>setIsDelete(false)}
          color='secondary'
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Cancel"}
        </Button>
        <Button
          variant="contained"
          className=""
          fullWidth
          type="button"
          color='error'
          onClick={deleteHelper}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Delete"}
        </Button>
      </div>
    </div>
  }



  const isValid = asset && description && category && tags.length > 0;
  return (
    <div className="m-auto text-center bg-white">
      <h3 className="text-bold text-xl font-bold p-3">Edit Asset</h3>
      {error && <p className="text-red-500 text-center font-bold p-1 pb-2">{error}</p>}
      <form onSubmit={submitHandler}>
        <FormControl fullWidth>
          <TextField
            label="Asset Name"
            variant="outlined"
            fullWidth
            type="text"
            className="mb-4"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          type="text"
          className="mb-4"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Teams</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={teams}
                label="Type"
                onChange={(e) => setTeams(e.target.value)}
              >
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </Select>
            </FormControl>
        <p className="py-2"></p>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={types}
                label="Type"
                onChange={(e) => setTypes(e.target.value)}
              >
                <MenuItem value="Tools">Tools</MenuItem>
                <MenuItem value="Inspiration">Inspiration</MenuItem>
                <MenuItem value="Games">Games</MenuItem>
                <MenuItem value="Tutorial">Tutorial</MenuItem>
                <MenuItem value="Blog">Blog</MenuItem>
              </Select>
            </FormControl>
        <p className="py-2"></p>
            

        <CategoryComponent category={category} setCategory={setCategory}/>
        <p className="py-2"></p>
        <TagHandler tags={tags} setTags={setTags} />
        <a className='px-3 py-2 bg-gray-200 hover:bg-gray-400 ' href={props.link} target="_blank" rel="noopener noreferrer">Click here to Visit the Link</a>
        <p className="py-2"></p>
      <div className='flex flex-row  gap-2'>
        <Button
          variant="contained"
          className=""
          fullWidth
          type="button"
          onClick={()=>setIsDelete(true)}
          color='error'
          disabled={loading || !isValid}
        >
          {loading ? <CircularProgress /> : "Delete"}
        </Button>
        <Button
          variant="contained"
          className=""
          fullWidth
          type="submit"
          color='success'
          disabled={loading || !isValid}
        >
          {loading ? <CircularProgress /> : "Edit"}
        </Button>
      </div>
        </ FormControl>
      </form>
    </div>
  )
}

export default EditForm