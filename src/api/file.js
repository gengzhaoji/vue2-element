import axios, { download } from '@/utils/axios'
/**
 * 文件上传
 * @param {FormData} data 
 * @returns 
 */
export const fileUpload = data => axios({ method: "post", data, url: "/file/upload", headers: { "Content-Type": "multipart/form-data" } });

/**
 * 文件下载
 */
export const downloadFile = data => download(`/file/downloadFile`, { fileUrl: data.url, fileName: data.fileName }, data.fileName, false);
