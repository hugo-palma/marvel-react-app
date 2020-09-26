import React from 'react'
import {PureComponent, FixedSizeGrid} from 'react-window'


export default class ComicRenderer extends React.PureComponent {
    render(){
        return(
            <FixedSizeGrid
            itemData={this.props.itemArray}
            {...this.props}
            >
                {ItemRenderer}
            </FixedSizeGrid>
        )
    }
}
class ItemRenderer extends React.PureComponent {
    render() {
      const { columnIndex, data, rowIndex, style } = this.props;
      
      // Access the data source using the "data" prop:
      const item = data[rowIndex][columnIndex];
   
      return (
        <div style={style}>
          {item}
        </div>
      );
    }
  }