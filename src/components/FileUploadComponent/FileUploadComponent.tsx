import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface YourComponentProps {
    upload: (file: File, folder: string) => Promise<string>;
    setFile: React.Dispatch<React.SetStateAction<string | null>>; // Define the setFile function type
  }

  const FileUploadComponent: React.FC<YourComponentProps> = ({ upload, setFile }) => {
    const {
      register,
    } = useForm();
    return (
    <div>
      <label htmlFor="file" className="file-upload-label">
        <FontAwesomeIcon icon={faUpload} /> Upload File
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
            if (fileUrl) setFile(fileUrl);
          }
        }}
        style={{ display: 'none' }} 
      />
    </div>
  );
}

export default FileUploadComponent;
