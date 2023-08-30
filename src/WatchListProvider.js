import { createContext, useState, useContext } from "react";

const WatchContext = createContext();
export const useWatchList = () => {
  return useContext(WatchContext);
};
const WatchListProvider = ({ children }) => {
  // const [watchList, setWatchList] = useState(false);
  const [watchListItems, setWatchListItems] = useState([]);
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const toggleWatchList = ({ content, media_type }) => {
    const newItem = {
      media_type: media_type,
      title: content.title || content.name,
      poster: content.poster_path,
      id: content.id,
      rating: content.vote_average,
      formattedDate: formatDate(content.release_date || content.first_air_date),
    };

    setWatchListItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (prevItems[content.id]) {
        delete updatedItems[content.id];
      } else {
        updatedItems[content.id] = newItem;
      }
      return updatedItems;
    });
  };

  const contextValue = {
    watchListItems,
    setWatchListItems,
    toggleWatchList,
  };
  return (
    <>
      <WatchContext.Provider value={contextValue}>
        {children}
      </WatchContext.Provider>
    </>
  );
};
export default WatchListProvider;
