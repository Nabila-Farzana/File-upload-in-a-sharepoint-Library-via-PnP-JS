import * as React from 'react';
 
   class FileUploaderPresentationalComponent extends React.Component<{tableHeader: any ,tableData: any, dragging: boolean,onDrag: (event: React.DragEvent<HTMLDivElement>) => void
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void, onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void,onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void,onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void,onDrop: (event: React.DragEvent<HTMLDivElement>) => void}> {
  
        constructor(props) {
            super(props);
            console.log("props", props);
            
        }
  public render(): React.ReactElement<{}> {
    var columns = this.props.tableHeader;
    var rows = this.props.tableData;
    var tableheaders = (<thead>
        <tr>{columns.map((column)=> {
            return <th>{column}</th>
        })}</tr>
    </thead>)
   var tableBody = rows.map((row)=>{
     return(
       <tr>
         {columns.map((column)=>{
           return <td   onDrag={this.props.onDrag}
             onDragStart={this.props.onDragStart}
             onDragEnd={this.props.onDragEnd}
             onDragOver={this.props.onDragOver}
             onDragEnter={this.props.onDragEnter}
             onDragLeave={this.props.onDragLeave}
             onDrop={this.props.onDrop}>{row[column]}</td>
         })}
       </tr>
     )
   })
    return (
      <table>
        {tableheaders}
        {tableBody}
      </table>
    );
        }
  };
  export default FileUploaderPresentationalComponent;
