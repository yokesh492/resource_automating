import Image from "next/image";
import Card from "./card";

const data = [
  {
    id:1,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
  {
    id:2,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
  {
    id:3,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
  {
    id:4,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
  {
    id:5,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
  {
    id:6,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
  {
    id:7,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
  {
    id:8,
    asset_name: "UI & UX Design Tips by Jim Raptis.",
    category: "Visuals",
    description:
      "Learn UI & UX Design with practical byte-sized tips and in-depth articles from Jim Raptis.",
    link: "https://www.uidesign.tips/",
    tags: ["UI", "UX", "Design"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="m-2">
        <div className="flex flex-row p-5 w-full">
          <h1 className="font-bold text-3xl float-left">Gallery</h1>
          <div className="ml-auto">
            <button className="p-2 m-auto mr-4 rounded-lg border shadow-lg bg-white text-center">
              ...
            </button>
            <button className="font-bold text-white bg-black m-auto p-2 text-center rounded-lg shadow-lg">
              Add Asset
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="px-5">
            <select
              name="Category"
              id="cat"
              className="p-2 rounded-lg shadow-md text-gray-600 font-semibold mr-4"
            >
              <option value="Category">Category</option>
              <option value="Event">Event</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
            </select>
            <select
              name="Tags"
              id="tag"
              className="p-2 rounded-lg shadow-md text-gray-600 font-semibold"
            >
              <option value="Category">Tag</option>
              <option value="Event">Event</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
            </select>
          </div>
          <div className="ml-auto">
            <button className="p-4 m-auto">Filter</button>
            <button className="p-4 m-auto">Sort</button>
            <button className="border border-red-400">
              {" "}
              <Image
                src={"/image.png"}
                className="w-full h-full"
                width={30}
                height={30}
                alt="Image"
              />{" "}
            </button>
          </div>
        </div>
        <hr />
        <div className="m-4 grid grid-cols-6 gap-4">
          {data.map((item, index) => {
            return <Card key={item.id} {...item} />;
          })}
        </div>
      </div>
    </main>
  );
}
