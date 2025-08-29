# react-infinite-scroll-smart

A lightweight and flexible **Infinite Scroll Component** for React. Supports both **normal lists** (e.g., feeds) and **reversed lists** (e.g., chat UIs).

---

## ✨ Features

- 📜 Infinite scroll for **bottom-to-top** and **top-to-bottom** lists
- ⚡ Works with async data loading
- 🔄 Supports reversed layouts (chat-like UI)
- 🎯 Simple API, minimal setup
- 🛠️ Customizable `rootMargin` and scroll direction

---

## Usage

1. Feed (normal list)

```ts
import { InfiniteScroll } from "react-infinite-scroll-smart";

function App() {
  return (
    <div className="app">
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
  );
}

export default App;
```

2. Chats (revered list)

```ts
import { InfiniteScroll } from "react-infinite-scroll-smart";

function App() {
  return (
    <div className="app">
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
  );
}

export default App;
```

## 📦 Installation

```bash
npm install react-infinite-scroll-smart
# or
yarn add react-infinite-scroll-smart
```

## 🧪 Local Development

If you want to test the hook locally before publishing:

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/Sahil-4/react-infinite-scroll-smart
cd react-infinite-scroll-smart
npm install
```

2. Link it to a local project:

```bash
npm link
cd ../your-test-app
npm link react-infinite-scroll-smart
```

3. Import and experiment in your test project.

## 📄 License

This project is licensed under the MIT License – see the [License](/LICENSE.md) file for details.
