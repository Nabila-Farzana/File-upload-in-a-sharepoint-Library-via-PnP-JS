import * as React from 'react';
import { IFileUploaderProps } from './IFileUploaderProps';
import FileUploaderPresentationalComponent from "./FileUploaderPresentationalComponent";
import fileUploadApi from "../Service/FileUploadService"
export interface IFileUploaderState {
  dragging : boolean;
  Columndata : any[];
  rowdata : any[];
}
export default class FileUploader extends React.Component<IFileUploaderProps, IFileUploaderState> {
  static counter = 0;
  fileUploaderInput: HTMLElement | null = null;
  public TableData : any [];
  constructor(props: IFileUploaderProps) {
    super(props);
    this.state = { 
      dragging: false, 
      Columndata : [],
      rowdata : []
    };
  }
  componentDidMount() { 
    window.addEventListener("dragover", (event: Event) => {
      this.overrideEventDefaults(event);
    });
    window.addEventListener("drop", (event: Event) => {
      this.overrideEventDefaults(event);
    });
    this.setState({Columndata: ['File_Name','File_Size','File_Type'],
                    rowdata: [
                      {
                        'File_Name':'test doc.x',
                        'File_Size':'82.8',
                        'File_Type':'File'
                      },
                      {
                        'File_Name':'test test doc.x',
                        'File_Size':'182.8',
                        'File_Type':'File'
                      },
                      {
                        'File_Name':'testtest testdoc.x',
                        'File_Size':'482.8',
                        'File_Type':'File'
                      },
                      {
                        'File_Name':'test test test test doc.x',
                        'File_Size':'782.8',
                        'File_Type':'File'
                      }
                      ]})
  }
  
  componentWillUnmount() {
    window.removeEventListener("dragover", this.overrideEventDefaults);
    window.removeEventListener("drop", this.overrideEventDefaults);
  }
  dragEventCounter = 0;

  dragenterListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter++;
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      this.setState({ dragging: true });
    } else if (
      event.dataTransfer.types &&
      event.dataTransfer.types[0] === "Files"
    ) {
      // This block handles support for IE - if you're not worried about
      // that, you can omit this
      this.setState({ dragging: true });
    }
  };

  dragleaveListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter--;
    if (this.dragEventCounter === 0) {
      this.setState({ dragging: false });
    }
  };
  dropListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter = 0;
    this.setState({ dragging: false });
    if (event.dataTransfer.files && event.dataTransfer.files[0].type != "") {
     let data = {
      "File_Name" : event.dataTransfer.files[0].name,
      "File_Size" : event.dataTransfer.files[0].size,
      "File_Type" : event.dataTransfer.files[0].type,
    }
    this.setState({rowdata : [...this.state.rowdata , data]});
    
    let siteRelativeUrl = this.props.context.pageContext.web.serverRelativeUrl;
    let UploadFileInList = new fileUploadApi(this.props.siteurl,siteRelativeUrl);
    UploadFileInList.uploadFileInList(event.dataTransfer.files[0].name,event.dataTransfer.files[0]).then(()=>{
      console.log("Upload complete");
    })
  }
  };

  overrideEventDefaults = (event: Event | React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
 
  public render(): React.ReactElement<IFileUploaderProps> {
    return (
        <FileUploaderPresentationalComponent
        tableHeader = {this.state.Columndata}
        tableData = {this.state.rowdata}
        dragging={this.state.dragging}
        onDrag={this.overrideEventDefaults}
        onDragStart={this.overrideEventDefaults}
        onDragEnd={this.overrideEventDefaults}
        onDragOver={this.overrideEventDefaults}
        onDragEnter={this.dragenterListener}
        onDragLeave={this.dragleaveListener}
        onDrop={this.dropListener}
      >
      </FileUploaderPresentationalComponent>
    );
  }
}
