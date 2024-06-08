import {create} from 'zustand';

export const useData = create((set) => ({
    data: [],
    setData: (data) => set({data}),
}));

export const useFilters = create((set) => ({
    type:'',
    setType: (type) => set({type}),
    team:'All',
    setTeam: (team) => set({team}),
    category:'',
    setCategory: (category) => set({category}),
    tags:[],
    setTags: (tags) => set({tags}),
}));
