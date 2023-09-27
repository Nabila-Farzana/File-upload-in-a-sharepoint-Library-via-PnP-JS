import { Web } from '@pnp/sp';
class FileUploadService {
    public siteUrl: string;
    public web: Web;
    public siteRelativeUrl: string;

    public constructor(siteUrl: string, siteRelativeUrl: string) {
        this.siteUrl = siteUrl;
        this.web = new Web(this.siteUrl);
        this.siteRelativeUrl = siteRelativeUrl;
    }
 public async uploadFileInList(fileName: any ,file : any) : Promise<any>{
  return this.web.getFolderByServerRelativePath("/sites/Met_6/ProjectRoom/Lists/metProjectDocuments")
        .files
        .add(fileName,file,false)
        .then((data)=>{
            alert(fileName + " upload successfully!"); 
        })

 }

}
export default FileUploadService;