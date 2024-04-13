// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import upload from '../../Utils/Cloudinary/cloudinary';
import { GrAttachment } from 'react-icons/gr';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface File {
  url: string;
  size: number;
  fileName: string;
}
interface YourComponentProps {
  setYourFile:React.Dispatch<React.SetStateAction<File>> ; 
  }

  const FileUploadComponent: React.FC<YourComponentProps> = ({ setYourFile }) => {
    const {
      register,
    } = useForm();
    return (
    <div style={{margin:'2%'}}>
      <label htmlFor="file" className="file-upload-label" style={{cursor:'pointer'}} >
      <div style={{ margin: "3%" }}>
          <GrAttachment style={{ width: "300%", height: "100%" }} />
        </div> 
      </label>
      <input
        type="file"
        id="file"
        accept=".pdf"
        {...register("file", {
          required: true, 
        })}
        onChange={async (e) => {
          const files = e.target.files;
          if (files) {
            const pdf = files[0];
            const fileUrl = await upload(pdf, "resume");
            if (fileUrl ) setYourFile(fileUrl);
          }
        }}
        style={{ display: 'none' }} 
      />
    </div>
  );
}

export default FileUploadComponent;
