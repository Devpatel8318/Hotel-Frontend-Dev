import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function DevUploader({ imageUrl="https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/7e7f4c4a-c496-4844-bd02-44e276b41718.jpeg?im_w=1200", filename="dev" }) {

  const [srcPath, setSrcPath] = useState([]);

  const [postImage, setPostImage] = useState([]);

  useEffect(() => {
    console.log("effect", postImage);

  }, [postImage])

  useEffect(() => {
    console.log("effect path", srcPath);

  }, [srcPath])



  async function createPost(newImage) {
    console.log(newImage);
    const data = { myFile: newImage }

    axios.post('http://localhost:4000/devupload', data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      crossDomain: true,
      responseType: 'json'
    })
      .then(response => {
        console.log(response.data.images.myFile);

        setSrcPath(response.data.images.myFile);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error);
      }
    });
  }

  async function handleFileUpload(e) {
    const files = e.target.files;
    const base64Array = [];
    Array.from(files).forEach(async (file) => {
      const base64 = await convertToBase64(file);
      base64Array.push(base64);
    });
    // console.log(base64Array);
    setPostImage(base64Array);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    // console.log(postImage);
    setSrcPath(null);
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>


        <input onChange={(e) => handleFileUpload(e)} className=' hidden' type="file" label="Image" name="MyFile" id="file-upload" multiple accept='.jpeg,.jpg,.png' />






        <button className='bg-gray-500 p-4 mt-8 mb-8 rounded-2xl px-8' type='submit'>Submit</button>
        <br />






        <label htmlFor="file-upload" className="mt-10 bg-red-300 px-8 py-4 mb-8 border-gray-500 w-4 f-4 rounded-md cursor-pointer" >
        </label>

        {srcPath && (srcPath.length > 0) && (
          <div>

            {srcPath.map((path, index) => (
              <img key={index} src={path} alt="cat" />
            ))}
          </div>
        )}


      </form>
    </div>
  )
}

export default DevUploader      