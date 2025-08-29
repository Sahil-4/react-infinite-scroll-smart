import { InfiniteScroll } from "react-infinite-scroll-smart";
// import InfiniteScroll from "./components/infiniteScroll";
import useDataFetching from "./hooks/useDataFetching.ts";
import "./App.css";

function App() {
  const { fetchData, data, error, loading, hasNext } = useDataFetching();

  return (
    <div className="app">
      <div className="lists-container">
        <div>
          <h2>Normal List - sentinal at bottom</h2>
          <InfiniteScroll
            callback={fetchData}
            disabled={!hasNext}
            className="container"
            direction="bottom"
          >
            <>
              {data.map((item) => (
                // Item component
                <div className="data-item" key={item.id}>
                  <p>{item.title}</p>
                  <p>USD {item.price}</p>
                </div>
              ))}
              {loading && <p>Loadng...</p>}
              {!!error && <p>Error occorred</p>}
            </>
          </InfiniteScroll>
        </div>

        <div>
          <h2>Chat style list - sentinal at top</h2>
          <InfiniteScroll
            callback={fetchData}
            disabled={!hasNext}
            className="container"
            direction="top"
          >
            <>
              {data.map((item) => (
                // Item component
                <div className="data-item" key={item.id}>
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
    </div>
  );
}

export default App;
