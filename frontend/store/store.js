import { create } from "zustand";
import { types } from "../data/types";
import { category } from "../data/category";
import { Tags } from "../data/tags";
import { notiData } from "../data/Notification";

//Sets the data to display
export const useData = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

//Data used for filtering
export const useFilters = create((set) => ({
  type: "",
  setType: (type) => set({ type }),
  team: "All",
  setTeam: (team) => set({ team }),
  category: "",
  setCategory: (category) => set({ category }),
  tags: [],
  setTags: (tags) => set({ tags }),
}));

//Booleans for opening and closing modals
export const useFilterModal = create((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));

export const useLinkModal = create((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));

export const useAssetModal = create((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));

export const useNotificationModal = create((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));

//Data for card modal and opening and closing it
export const useCardModal = create((set) => ({
  open: false,
  data: {
    asset_name: "",
    description: "",
    type: "",
    category: "",
    tags: [],
    link: "",
    addedBy: "",
  },
  handleOpen: (data) => set({ open: true, data: data }),
  handleClose: () => set({ open: false, data:  {
    asset_name: "",
    description: "",
    type: "",
    category: "",
    tags: [],
    link: "",
    addedBy: "",
  } }),
}));

//Storing the notification data
export const useNotification = create((set) => ({
  notificationData : notiData,
  setNotification: (data) => set((state) => (
    {
      notificationData: [state.notificationData[1],state.notificationData[2], data]
    }
  )),
}));

//Extracted data from the link
export const useExtractedData = create((set) => ({
  extractedData: {
    asset_name: "",
    description: "",
    type: "",
    category: "",
    tags: [],
    link: "",
    addedBy: "",
  },
  setExtractedData: (extractedData) => set({ extractedData }),
}));

//Handles filter states
export const usetypeStateHandler = create((set) => ({
  typeData: types.reduce((acc, type) => {
    acc[type] = false;
    return acc;
  }, {}),
  setType: (type) => set((state) => ({
    typeData: {
      ...state.typeData,
      [type]: !state.typeData[type]
    }
  })),
}));

export const usecategoryStateHandler = create((set) => ({
  state: Object.keys(category).reduce((acc, type) => {
    acc[type] = category[type].reduce((innerAcc, item) => {
      innerAcc[item] = false;
      return innerAcc;
    }, {});
    return acc;
  }, {}),
  
  setCategory: (type, item) => 
    set((state) =>  ({
      state: {
        ...state.state,
        [type]: {
          ...state.state[type],
          [item]: !state.state[type][item],
        },
      },
    })),
}));

export const usetagsStateHandler = create((set) => ({
  tagsData: Tags.reduce((acc, tag) => {
    acc[tag] = false;
    return acc;
  }, {}),
  setTags: (tag) => set((state) => ({
    tagsData: {
      ...state.tagsData,
      [tag]: !state.tagsData[tag]
    }
  })),
}));

export const useTeamSatate = create((set) => ({
  teamData:'All',
  setTeam: (team) => set({ teamData: team}),
}));
