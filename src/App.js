import logo from './logo.svg';
import './App.css';
import { loremIpsum } from 'lorem-ipsum';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

function App() {

  const rows = 1000;

  const list = Array(rows).fill().map((val, idx) => ({
    id: idx,
    name: 'John Doe',
    image: 'http://via.placeholder.com/50',
    text: loremIpsum({
      count: 2,
      units: 'sentences',
      sentenceLowerBound: 4,
      sentenceUpperBound: 10,
    })
  }));

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });

  const renderRow = ({ index, key, style, parent }) => (

    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}>
      <div style={style} className="row">
        <div className="image">
          <img src={list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{list[index].name}</div>
          <div>{list[index].text}</div>
        </div>
      </div>
    </CellMeasurer>
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to React Virtualization
        </p>
      </header>

      <div className="list">

        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={renderRow}
              rowCount={list.length}
              overscanRowCount={3} />
          )}
        </AutoSizer>

      </div>
    </div>
  );
}


export default App;
