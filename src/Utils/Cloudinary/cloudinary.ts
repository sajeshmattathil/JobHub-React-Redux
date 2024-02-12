import axios from "axios"
const upload = async (pdf :File,foldername : string)=>{
    try {
        const cloudName = import.meta.env.VITE_CLOUD_NAME
        const cloudPreset = import.meta.env.VITE_CLOUD_PRESET 
        
                const formData = new FormData()
                formData.append('file',pdf)
                formData.append("upload_preset", cloudPreset);
                formData.append('folder',foldername)

                for (const entry of formData.entries()) {
                    const [key, value] = entry;
                    console.log(key, value);
                  }
                  
                
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload/`,formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                })
                console.log(response,'upload response');
                
        return response.data.secure_url
    } catch (error) {
        console.log('Uploading pdf file failed ',error);
        
    }
}

export default upload