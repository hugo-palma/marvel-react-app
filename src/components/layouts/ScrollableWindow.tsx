import React, { useEffect, useContext, useState } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {
  ComicsContext,
  TotalComicsAmountContext,
} from "../../pages/comics/comics";
import RowRenderer from "src/components/layouts/RowRenderer";

const ITEM_WIDTH = 296;
const ITEM_HEIGHT = 421;

interface Props {
  loadMoreItems: any;
  hasNextPage: boolean;
}

const ScrollableWindow = (props: Props) => {
  const infiniteLoaderRef: React.RefObject<any> = React.createRef();
  const height = window.innerHeight;
  const width = window.innerWidth;
  //TODO: MAKE CONTEXT SWAPPABLE
  const comicsResponse = useContext(ComicsContext);
  const [totalItemsAmount, setTotalItemsAmount] = useState(20);
  useEffect(() => {
    console.log(`totalItemsAmount ${totalItemsAmount}`)
    if(comicsResponse && comicsResponse.data)
    setTotalItemsAmount(comicsResponse?.data?.results.length + 20)
  }, [comicsResponse])
  const [hasNextPage, setHasNextPage] = useState(props.hasNextPage);
  //TODO: make rowCountUpdate when loading
  const getMaxItemsAmountPerRow = (width: number) => {
    console.log(`${width} ${ITEM_WIDTH}`);
    return Math.max(Math.floor(width / ITEM_WIDTH), 1);
  };
  const rowCount = getRowsAmount(
    width,
    totalItemsAmount,
    false,
    getMaxItemsAmountPerRow(width)
  );
  //const allItemsLoaded = generateIndexesForRow(index, maxItemsPerRow, movies.length).length > 0;
  const isItemLoaded = (index: number) => !hasNextPage; //|| allItemsLoaded;

  const requiredParams = {
    comicsResponse: comicsResponse,
    itemsPerRow: 7,
  };

  return (
    <InfiniteLoader
      ref={infiniteLoaderRef}
      itemCount={rowCount}
      loadMoreItems={props.loadMoreItems}
      isItemLoaded={isItemLoaded}
      threshold={1}
    >
      {({ onItemsRendered, ref }) => (
        <section>
          <List
            height={height}
            width={width}
            ref={ref}
            className="flex justify-center"
            itemCount={rowCount}
            itemSize={ITEM_HEIGHT}
            itemData={requiredParams}
            onItemsRendered={onItemsRendered}
          >
            {RowRenderer}
          </List>
        </section>
      )}
    </InfiniteLoader>
  );
};

function getRowsAmount(
  width: number,
  itemsAmount: number,
  hasNextPage: boolean,
  itemsPerRow: number
) {
  return Math.ceil(itemsAmount / itemsPerRow) + (hasNextPage ? 1 : 0);
}

export default ScrollableWindow;
