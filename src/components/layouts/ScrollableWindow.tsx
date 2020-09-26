import React, { useEffect, useContext } from "react";
import { FixedSizeList as List } from "react-window";
import { ComicsContext } from "../../pages/comics/comics";
import RowRenderer from "src/components/layouts/RowRenderer";

const ITEM_WIDTH = 400;
const ITEM_HEIGHT = 360;

interface Props {
  itemsPerRow: number;
}

const ScrollableWindow = (props: Props) => {
  const width = 0.85 * window.innerWidth;
  const rowCount = getRowsAmount(width, 20, false);
  const comicsResponse = useContext(ComicsContext);
  useEffect(() => {
    console.log("useEffect en scrollable window");
    if (comicsResponse) {
      console.log(`window ${comicsResponse}`);
    }
  }, [comicsResponse]);
  const requiredParams = {
    comicsResponse: comicsResponse,
    itemsPerRow: 5,
  };

  return (
    <List
      height={700}
      width={1600}
      itemSize={ITEM_HEIGHT}
      className="flex justify-center"
      itemCount={rowCount}
      itemData={requiredParams}
    >
      {RowRenderer}
    </List>
  );
};

function getMaxItemsAmountPerRow(width: number) {
  return Math.max(Math.floor(width / ITEM_WIDTH), 1);
}

function getRowsAmount(width: number, itemsAmount: number, hasMore: boolean) {
  const maxItemsPerRow = getMaxItemsAmountPerRow(width);

  return Math.ceil(itemsAmount / maxItemsPerRow) + (hasMore ? 1 : 0);
}

export default ScrollableWindow;
