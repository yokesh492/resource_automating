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

export const useFilterModal = create((set) => ({
    open: false,
    handleOpen: () => set({open: true}),
    handleClose: () => set({open: false}),
}));

export const useLinkModal = create((set) => ({
    open: false,
    handleOpen: () => set({open: true}),
    handleClose: () => set({open: false}),
}));

export const useAssetModal = create((set) => ({
    open: false,
    handleOpen: () => set({open: true}),
    handleClose: () => set({open: false}),
}));

export const useCardModal = create((set) => ({
    open: false,
    data: {asset_name:'',description:'',type:'',category:'',tags:[],link:'',addedBy:''},
    handleOpen: (data) => set({open: true, data: data}),
    handleClose: () => set({open: false, data: null}),
}));


export const useExtractedData = create((set) => ({
    extractedData: null,
    setExtractedData: (extractedData) => set({extractedData}),
}));
