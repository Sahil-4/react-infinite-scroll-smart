import InfiniteScroll from "react-infinite-scroll-smart";
// import InfiniteScroll from "./components/infiniteScroll";
import useDataFetching from "./hooks/useDataFetching.ts";
import "./App.css";

const NormalList = () => {
  const { fetchData, data, error, loading, hasNext } = useDataFetching();

  return (
    <div>
      <h2>Normal List - sentinal at bottom</h2>
      <div>
        <InfiniteScroll
          callback={fetchData}
          useWindowScroll={true}
          disabled={!hasNext}
          direction="bottom">
          <>
            {data.map((item, index) => (
              // Item component
              <div className="data-item" key={index}>
                <p>{item.title}</p>
                <p>USD {item.price}</p>
              </div>
            ))}
            {loading && <p>Loadng...</p>}
            {!!error && <p>Error occorred</p>}
          </>
        </InfiniteScroll>
      </div>
    </div>
  );
};

const ChatsList = () => {
  const { fetchData, data, error, loading, hasNext } = useDataFetching();

  return (
    <div>
      <h2>Chat style list - sentinal at top</h2>
      <div>
        <InfiniteScroll
          callback={fetchData}
          style={{ height: "480px", overflow: "auto" }}
          disabled={!hasNext}
          direction="top">
          <>
            {data.map((item, index) => (
              // Item component
              <div className="data-item" key={index}>
                <p>{item.title}</p>
                <p>USD {item.price}</p>
              </div>
            ))}
            {loading && <p>Loadng...</p>}
            {!!error && <p>Error occorred</p>}
          </>
        </InfiniteScroll>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <div className="lists-container">
        <NormalList />
        <ChatsList />
      </div>
    </div>
  );
}

export default App;
