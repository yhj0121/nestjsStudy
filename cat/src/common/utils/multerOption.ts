import * as multer from 'multer';

import * as path from 'path';

import * as fs from 'fs';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');

    fs.mkdirSync(path.join(__dirname, '..', `uploads`)); //upload라는 폴더 만들어라
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`)); //폴더 만들기
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder); //폴더 만들기

  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName);
    },

    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지

      const ext = path.extname(file.originalname); //확장자명

      const fileName = `${path.basename(
        file.originalname,

        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};
//두번쨰 입자에 오는거
//폴더 위치 다르게
export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
