import Navbar from "./components/Navbar";
import { FaMusic } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { IconContext } from "react-icons";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import Dropdown from "./components/Dropdown";

function App() {
  const [playList, setPlayList] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSong, setNewSong] = useState({});
  const [music, setMusic] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [dropList, setDropList] = useState([]);
  
  const drplist = dropList
  const CountArtist = () => {
    let arr = [];
    for (let elem of playList) {
      arr.push(elem["artist"]);
    }
    setDropList(arr);
  };

  useEffect(() => {
    if (playList.length > 0) {
      CountArtist();
    }
  }, [playList]);



  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/music/artist/");
      setPlayList(res.data);
      setOpen(false);
      // console.log(playList)
    } catch (err) {
      setOpen(false);
      console.log(err);
    }
  
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e, field) => {
    setNewSong({ ...newSong, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/music/artist/new/", newSong);
      setMusic([response.data, ...response]);
      console.log(music);
      await fetchData(); // Wait for fetchData to complete
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterbutton = () => {
    if (filterOpen === true) {
      setFilterOpen(false);
    } else {
      setFilterOpen(true);
    }
  };

  return (
    <div className="flex-col h-screen md:h-screen bg-[#FFEDDB]">
      <div className="p-3">
        <Navbar />
      </div>
      <div className="flex justify-between w-full shadow-sm px-4">
        <p className="flex gap-2 font-mono font-bold text-4xl p-3">
          My Current Playlist
          <IconContext.Provider value={{ color: "#F1A661" }}>
            <span>
              <FaMusic />
            </span>
          </IconContext.Provider>
        </p>
        <div className="flex gap-1 items-center">
          <div className="">
          <IconContext.Provider value={{ color: "F1A661", size: "2em" }}>
            <span
              onClick={handleFilterbutton}
              className="hover:bg-[#ae7734d7] flex justify-center items-center rounded-lg transition ease-out delay-75 w-[6vh] h-[6vh]"
            >
              <FaFilter />
            </span>
          </IconContext.Provider>
          <div
            className={`${
              filterOpen == false
                ? "hidden"
                : "absolute top-[150px] bg-slate-50 h-[10vh] shadow-sm drop-shadow-md rounded-md w-[24vh] transition-opacity ease-in-out delay-75 p-2"
            } `}
          >
            <Dropdown datalist={drplist} selectOption={selectedOption} setSelectOption={setSelectedOption}/>
          </div>
          </div>
          
          <button
            type="button"
            onClick={() => setOpen(true)}
            className=" h-[6vh] w-[14vw] md:w-[8vw] rounded-3xl m-1  bg-[#ae7734d7] hover:bg-[#4c3a25d7] font-mono font-bold text-lg text-white"
          >
            Add Song
          </button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="w-[35vw] h-[40vh] flex-col">
            <div className="flex-col">
              <div className=" flex-col w-full p-2">
                <p className=" shadow-sm m-1">Enter the Artist</p>
                <input
                  type="text"
                  placeholder=" Artist's Name"
                  className=" bg-[#F1EEE9] w-[80%] h-8"
                  onChange={(e) => handleChange(e, "artist")}
                />
              </div>
              <div className=" flex-col w-full p-2">
                <p className=" shadow-sm m-1">Enter the Title</p>
                <input
                  type="text"
                  placeholder=" Title"
                  className=" bg-[#F1EEE9] w-[80%] h-8"
                  onChange={(e) => handleChange(e, "title")}
                />
              </div>
              <div className=" flex-col w-full p-2">
                <p className=" shadow-sm m-1">Enter the Link</p>
                <input
                  type="text"
                  placeholder=" Enter the URL"
                  className=" bg-[#F1EEE9] w-[80%] h-8"
                  onChange={(e) => handleChange(e, "link")}
                />
              </div>
              <div className="w-full flex justify-center p-3">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-[#E38B29] font-mono font-medium w-[40%] h-8 rounded-lg hover:bg-[#794c19d3]"
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="w-full h-fit bg-[#FFEDDB] flex px-4 py-2">
        <Card songlist={playList} selectedartist={selectedOption}/>
      </div>
    </div>
  );
}

export default App;
