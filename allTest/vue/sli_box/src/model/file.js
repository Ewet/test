import { DOWNLOAD_URL } from '@/const/url';

const download = (fileId) => {
  location.href = `${DOWNLOAD_URL}?id=${fileId}`;
};
export {
  download
};
