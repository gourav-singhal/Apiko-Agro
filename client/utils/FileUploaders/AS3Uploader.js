import { get, APIAddresses } from '../api/';
import _ from 'lodash';

/**
 Provide uploading files to Amazon S3 bucket
    @touse
         compose(
         lifecycle({ componentWillMount: () => config() }),
    @example
           const files = e.target.file.files;
           uploadToAS3(files).then(...).catch(...)
 **/


const publicConfig = {
  dirName: '',
  region: '',
  bucketName: '',
  bucket: null,
  error: null,
};

export const config = () => {
  get(APIAddresses.AMAZONS3)
    .then(({ data }) => {
      window.AWS.config.update({
        accessKeyId: data.config.access_key,
        secretAccessKey: data.config.secret_key,
      });
      window.AWS.config.region = data.config.region;
      publicConfig.dirName = data.config.dirName;
      publicConfig.region = data.config.region;
      publicConfig.bucketName = data.config.bucket;
      publicConfig.bucket = new window.AWS.S3({ params: { Bucket: data.config.bucket } });
    }).catch(err => { publicConfig.error = err; });
};

const uploadFileToS3 = (file, files, isResolve, resolve) => {
  const fileS3Data = {
    Key: `${publicConfig.dirName}/${file.name}`,
    ContentType: file.type,
    Body: file,
    ACL: 'public-read',
  };

  publicConfig.bucket.putObject(fileS3Data, err => {
    if (err) {
      return new Error(err.message);
    }
    const fileData = {
      url: `https://${publicConfig.bucketName}.s3.${
        publicConfig.region}.amazonaws.com/${publicConfig.dirName}/${file.name}`,
      name: file.name,
    };
    files.push(fileData);
    return isResolve() && resolve(files);
  });
};

/**
 Provide insert single object via promise

   @param Array || FileList: Files
   @return Array: uploaded files,
         name: String
         url: String
 **/
export const uploadToAS3 = files => new Promise(resolve => {
  if (!publicConfig.bucket) {
    return new Error(publicConfig.message);
  }
  if (!files.length) {
    return resolve([]);
  }
  const uploadedFiles = [];
  const isResolve = () => uploadedFiles.length === files.length;
  if (_.isObject(files)) {
    return Object.keys(files).forEach(index =>
      uploadFileToS3(files[index], uploadedFiles, isResolve, resolve));
  }
  return files.forEach(file => uploadFileToS3(file, uploadedFiles, isResolve, resolve));
});

